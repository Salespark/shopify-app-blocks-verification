import HttpClient from '../utils/HttpClient';

class ShopifyService {
  static apiVersion = process.env.API_VERSION;
  public static shopifyThemes = async (shop: string, accessToken: string) => {
    const themeUrl = `https://${shop}/admin/api/${ShopifyService.apiVersion}/themes.json`;
    const {
      data: { themes },
    } = await HttpClient.shopifyGetRequest(themeUrl, accessToken);

    return themes;
  };

  public static shopifyThemeAssets = async (
    shop: string,
    accessToken: string,
    publishedTheme: any,
    query: any = {},
  ) => {
    let themeUrl = `https://${shop}/admin/api/${ShopifyService.apiVersion}/themes/${publishedTheme.id}/assets.json`;

    if (Object.keys(query).length > 0) {
      const qs = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join('&');
      themeUrl += `?${qs}`;
      const {
        data: { asset },
      } = await HttpClient.shopifyGetRequest(themeUrl, accessToken);
      return asset;
    }
    const {
      data: { assets },
    } = await HttpClient.shopifyGetRequest(themeUrl, accessToken);
    return assets;
  };

  public static findTemplateMainSections = async (
    shop: string,
    accessToken: string,
    publishedTheme: any,
    assets: Array<any>,
    templateJSONFiles: Array<any>,
  ) => {
    return (
      await Promise.all(
        templateJSONFiles.map(async (file, index) => {
          const asset = await ShopifyService.shopifyThemeAssets(shop, accessToken, publishedTheme, {
            'asset[key]': file.key,
          });
          const json = JSON.parse(asset.value);
          const sections: Array<any> = Object.entries(json.sections);
          const main: any = sections.find(
            ([id, section]) => id === 'main' || section.type.startsWith('main-'),
          );
          if (main) {
            return assets.find((file) => file.key === `sections/${main[1].type}.liquid`);
          }
          return null;
        }),
      )
    ).filter((value) => value);
  };

  public static findSectionsWithAppBlock = async (
    shop: string,
    accessToken: string,
    publishedTheme: any,
    assets: Array<any>,
    templateMainSections: Array<any>,
  ) => {
    return (
      await Promise.all(
        templateMainSections.map(async (file, index) => {
          let acceptsAppBlock = false;
          const asset = await ShopifyService.shopifyThemeAssets(shop, accessToken, publishedTheme, {
            'asset[key]': file.key,
          });
          const match = asset.value.match(/\{\%\s+schema\s+\%\}([\s\S]*?)\{\%\s+endschema\s+\%\}/m);
          const schema = JSON.parse(match[1]);
          if (schema && schema.blocks) {
            acceptsAppBlock = schema.blocks.some((b: any) => b.type === '@app');
          }
          return acceptsAppBlock ? file : null;
        }),
      )
    ).filter((value) => value);
  };

  public static verifyAppBlocks = async (request: any) => {
    const { shop, accessToken, appBlockTemplates } = request.body;
    let isThemeSupportsAppBlocks = false;
    const themes = await ShopifyService.shopifyThemes(shop, accessToken);
    const publishedTheme = themes.find((theme: any) => theme.role === 'main');
    const assets = await ShopifyService.shopifyThemeAssets(shop, accessToken, publishedTheme);
    const templateJSONFiles = assets.filter((file: any) => {
      return appBlockTemplates.some((template: any) => file.key === `templates/${template}.json`);
    });

    if (templateJSONFiles.length === appBlockTemplates.length) {
      console.log('All desired templates support sections everywhere!');
    } else if (templateJSONFiles.length) {
      console.log('Only some of the desired templates support sections everywhere.');
    }

    const templateMainSections = await ShopifyService.findTemplateMainSections(
      shop,
      accessToken,
      publishedTheme,
      assets,
      templateJSONFiles,
    );
    const sectionsWithAppBlock = await ShopifyService.findSectionsWithAppBlock(
      shop,
      accessToken,
      publishedTheme,
      assets,
      templateMainSections,
    );

    if (templateJSONFiles.length === 0 || sectionsWithAppBlock.length === 0) {
      isThemeSupportsAppBlocks = false;
    } else if (templateJSONFiles.length === sectionsWithAppBlock.length) {
      isThemeSupportsAppBlocks = true;
    } else if (sectionsWithAppBlock.length > 0) {
      isThemeSupportsAppBlocks = true;
    } else {
      console.log('None of the desired templates support app blocks');
    }

    return isThemeSupportsAppBlocks;
  };
}

export default ShopifyService;
