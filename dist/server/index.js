"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const strapi = { "name": "ckeditor5" };
const pluginPkg = {
  strapi
};
const index = {
  register: ({ strapi: strapi2 }) => {
    strapi2.customFields.register({
      name: "CKEditor",
      plugin: pluginPkg.strapi.name,
      type: "richtext"
    });
  }
};
exports.default = index;
