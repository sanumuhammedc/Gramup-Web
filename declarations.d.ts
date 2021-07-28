declare namespace NodeJS 
{
  export interface ProcessEnv 
  {
    TELEGRAM_API_ID: number;
    TELEGRAM_API_HASH: string;
  }
}
interface image 
{
  src: string | undefined,
  srcSet: string | undefined,
  width: string | number | undefined,
  height: string | number | undefined
}

const imageContent: image;

declare module "*.png" { export default imageContent; }
declare module "*.jpg" { export default imageContent; }
declare module "*.jpeg" { export default imageContent; }
declare module "*.webp" { export default imageContent; }

declare module "*.gif"

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.ttf"
declare module "*.html"

declare module "@mtproto/core/envs/browser"{
  class MTProto
  {
      crypto = {
          getSRPParams
      };
      
      constructor({api_id, api_hash}:{api_id: number, api_hash: string})
      {
          this.api_id = api_id;
          this.api_hash = api_hash;
      }  

      async public call(method: string, params: Record<string, unknown>, options: Record<string, unknown>)
      {
          this.method = method;
          this.options = options;
          return {};
      }

      async public setDefaultDc(dcID: number)
      {
          this.dcID = dcID;
      }
  }
  export default MTProto;
}
