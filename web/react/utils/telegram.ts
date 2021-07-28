import MTProto from "@mtproto/core/envs/browser";
import { Errors, Status } from "./constants";

class Telegram
{
    private mtproto: MTProto;
    private phone: number | undefined;
    private phone_code_hash: string | undefined;

    constructor(api_id: number, api_hash: string)
    {
        this.mtproto = new MTProto({ api_id, api_hash });
    }

    async call(method: string, params = {}, options = {}) : Promise<Record<string, unknown>>
    {
        try 
        {
            const result = await this.mtproto.call(method, params, options);
            return result;
        }
        catch (error) 
        {
            console.error(error);
            const { error_code, error_message } = error;
    
            if (error_code === 420) 
            {
                const seconds = Number(error_message.split("FLOOD_WAIT_")[1]);
                const ms = seconds * 1000;
    
                await new Promise((resolve) => setTimeout(resolve, ms));
    
                return this.call(method, params, options);
            }
    
            if (error_code === 303) 
            {
                const [type, dcIdAsString] = error_message.split("_MIGRATE_");
    
                const dcId = Number(dcIdAsString);
    
                // If auth.sendCode call on incorrect DC need change default DC, because
                // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
                if (type === "PHONE") 
                    await this.mtproto.setDefaultDc(dcId);
                else 
                    Object.assign(options, { dcId });
            
    
                return this.call(method, params, options);
            }
    
            return Promise.reject(error);
        }
    }
    
    async getUser() 
    {
        try 
        {
            const user = await this.call("users.getFullUser", {
                id: {
                    _: "inputUserSelf",
                },
            });
    
            return user;
        }
        catch (error) 
        {
            return null;
        }
    }
    
    async sendCode(phone: number | string) 
    {
        this.phone = Number(phone);
        const { phone_code_hash, timeout } = await this.call("auth.sendCode", {
            phone_number: this.phone,
            settings: {
                _: "codeSettings",
            },
        });

        this.phone_code_hash = phone_code_hash as string;

        return timeout as number;
    }
    
    async signIn(code:number) 
    {
        try
        {
            if(!this.phone)
                throw "Phone number not found";

            if(!this.phone_code_hash)
                throw "Phone code hash not found";    

            const signInResult = await this.call("auth.signIn", {
                phone_code: code,
                phone_number: this.phone,
                phone_code_hash: this.phone_code_hash,
            });

            if(signInResult._ === Errors.ACCOUNT_NOT_CREATED)
                return Errors.ACCOUNT_NOT_CREATED;  

            return Status.SIGN_IN_SUCCESS;     
        }
        catch (error) 
        {
            if (error.error_message === Errors.PASSWORD_REQUIRED)
                return Errors.PASSWORD_REQUIRED;

            console.error(error);
            return Errors.UNKNOWN_ERROR;  
        }
    }
    
    signUp() 
    {
        return this.call("auth.signUp", {
            phone_number: this.phone,
            phone_code_hash: this.phone_code_hash,
            first_name: "MTProto",
            last_name: "Core",
        });
    }
    
    async checkPassword(password: string) 
    {
        const { srp_id, current_algo, srp_B } = await this.call("account.getPassword");
        const { g, p, salt1, salt2 } = current_algo as Record<string, string>;
  
        const { A, M1 } = await this.mtproto.crypto.getSRPParams({
            g,
            p,
            salt1,
            salt2,
            gB: srp_B,
            password,
        });
  
        return this.call("auth.checkPassword", {
            password: {
                _: "inputCheckPasswordSRP",
                srp_id,
                A,
                M1,
            },
        });
    }

    logOut() 
    {
        return this.call("auth.logOut");
    }
}

export default Telegram;
