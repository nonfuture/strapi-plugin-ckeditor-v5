var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import cloneDeep from "lodash/cloneDeep";
import { css, styled } from "styled-components";
import { Plugin, ButtonView, FileRepository, logWarning, SpecialCharacters, IconIndent, Alignment, Autoformat, AutoImage, BalloonToolbar, BlockQuote, Bold, Code, CodeBlock, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport, Heading, HorizontalLine, HtmlEmbed, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, List, ListProperties, Link, LinkImage, MediaEmbed, Paragraph, PageBreak, PasteFromOffice, PictureEditing, RemoveFormat, SourceEditing, SpecialCharactersEssentials, Strikethrough, Style, Subscript, Superscript, ShowBlocks, Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar, TodoList, Underline, WordCount, Markdown, TextTransformation } from "ckeditor5";
import DOMPurify from "dompurify";
import { jsx, jsxs } from "react/jsx-runtime";
import { lightTheme, Flex } from "@strapi/design-system";
const colors = css`
  ${({ theme }) => css`
    :root {
      /* -- Generic colors ---------------------------------------------------------------------- */

      --ck-color-focus-outer-shadow: ${theme.colors.primary600}1F !important;
      --ck-color-focus-disabled-shadow: ${theme.colors.primary200} !important;
      --ck-focus-ring: 1px solid ${theme.colors.primary600}9F !important;
      --ck-color-button-default-hover-background: ${theme.colors.primary100} !important;
    }

    .ck {
      /* -- Generic colors ---------------------------------------------------------------------- */

      --ck-color-base-focus: ${theme.colors.primary200};
      --ck-color-base-active: ${theme.colors.primary500}8F;
      --ck-color-base-active-focus: ${theme.colors.primary600};
      --ck-content-font-color: ${theme.colors.neutral800};
      --ck-color-base-border: ${theme.colors.neutral200};
      --ck-color-base-background: ${theme.colors.neutral0};
      --ck-custom-foreground: ${theme.colors.neutral200};
      --ck-color-base-foreground: var(--ck-color-base-background);
      --ck-color-focus-border: ${theme.colors.primary500};
      --ck-color-text: ${theme.colors.neutral800};
      --ck-custom-white: hsl(0, 0%, 100%);

      /* -- Buttons ----------------------------------------------------------------------------- */

      --ck-color-button-default-background: var(--ck-color-base-background);
      --ck-color-button-default-hover-background: ${theme.colors.primary100};
      --ck-color-button-default-active-background: ${theme.colors.primary100};
      --ck-color-button-default-active-shadow: ${theme.colors.primary100};
      --ck-color-button-default-disabled-background: var(--ck-color-base-background);

      --ck-color-button-on-color: ${theme.colors.primary600};
      --ck-color-button-on-background: ${theme.colors.primary100};
      --ck-color-button-on-hover-background: ${theme.colors.primary200};
      --ck-color-button-on-active-background: ${theme.colors.primary100};
      --ck-color-button-on-disabled-background: var(--ck-custom-foreground);
      --ck-color-button-on-active-shadow: ${theme.colors.primary200};

      --ck-color-button-action-background: ${theme.colors.success500}E5;
      --ck-color-button-action-hover-background: ${theme.colors.success500}F5;
      --ck-color-button-action-active-background: ${theme.colors.success500};
      --ck-color-button-action-disabled-background: ${theme.colors.success500}99;
      --ck-color-button-action-text: var(--ck-custom-white);

      --ck-color-switch-button-off-background: ${theme.colors.neutral400};
      --ck-color-switch-button-off-hover-background: ${theme.colors.neutral500};
      --ck-color-switch-button-on-background: var(--ck-color-button-action-background);
      --ck-color-switch-button-on-hover-background: var(--ck-color-button-action-hover-background);

      --ck-color-button-save: ${theme.colors.success500};
      --ck-color-button-cancel: ${theme.colors.danger500};

      --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
      --ck-color-split-button-hover-border: var(--ck-custom-foreground);

      /* -- Dropdown ---------------------------------------------------------------------------- */

      --ck-color-dropdown-panel-background: var(--ck-color-base-background);
      --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

      /* -- Input ------------------------------------------------------------------------------- */

      --ck-color-input-background: var(--ck-color-base-background);
      --ck-color-input-border: var(--ck-color-base-border);
      --ck-color-input-text: var(--ck-color-editor-base-text);

      --ck-color-input-disabled-background: ${theme.colors.neutral100};
      --ck-color-input-disabled-border: ${theme.colors.neutral150};
      --ck-color-input-disabled-text: ${theme.colors.neutral400};

      --ck-color-labeled-field-label-background: var(--ck-color-base-background);

      /* -- List -------------------------------------------------------------------------------- */

      --ck-color-list-background: var(--ck-color-base-background);
      --ck-color-list-button-hover-background: ${theme.colors.primary100};
      --ck-color-list-button-on-background: var(--ck-color-base-active);
      --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);

      /* -- Panel ------------------------------------------------------------------------------- */

      --ck-color-panel-background: var(--ck-color-base-background);
      --ck-color-panel-border: var(--ck-color-base-border);

      --ck-style-panel-button-label-background: ${theme.colors.neutral100};
      --ck-style-panel-button-hover-label-background: ${theme.colors.neutral150};
      --ck-style-panel-button-hover-border-color: var(--ck-color-base-border);

      /* -- Toolbar ----------------------------------------------------------------------------- */

      --ck-color-toolbar-background: var(--ck-color-base-background);
      --ck-color-toolbar-border: var(--ck-color-base-border);

      /* -- Tooltip ----------------------------------------------------------------------------- */

      --ck-color-tooltip-background: ${theme.colors.neutral800};
      --ck-color-tooltip-text: ${theme.colors.neutral100};

      /* -- Image ------------------------------------------------------------------------------- */

      --ck-content-color-image-caption-background: ${theme.colors.neutral100};
      --ck-content-color-image-caption-text: ${theme.colors.neutral800};

      /* -- Table ------------------------------------------------------------------------------- */

      --ck-content-color-table-caption-background: ${theme.colors.neutral100};
      --ck-content-color-table-caption-text: ${theme.colors.neutral800};

      /* -- Widget ------------------------------------------------------------------------------ */

      --ck-color-widget-blurred-border: ${theme.colors.neutral400};
      --ck-color-widget-hover-border: ${theme.colors.neutral300};
      --ck-color-widget-editable-focus-background: ${theme.colors.neutral150};
      --ck-color-widget-type-around-button-active: var(--ck-color-focus-border);
      --ck-color-widget-type-around-button-hover: ${theme.colors.neutral300};

      /* -- Link -------------------------------------------------------------------------------- */

      --ck-color-link-fake-selection: ${theme.colors.primary200};
      --ck-color-link-selected-background: ${theme.colors.primary200};

      /* -- Dialog ------------------------------------------------------------------------------ */

      --ck-color-dialog-background: var(--ck-color-base-background);
      --ck-color-dialog-form-header-border: var(--ck-color-base-border);

      /* -- PoweredBy --------------------------------------------------------------------------- */

      --ck-powered-by-background: transparrent;
    }
  `}
`;
const light = css`
  ${colors}
`;
const dark = css`
  ${colors}

  .ck.ck-powered-by > a > svg > path:nth-child(3) {
    fill: rgb(172, 156, 251);
  }
`;
const reset = css`
  ${({ theme }) => css`
    .ck {
      --ck-content-color-image-caption-background: hsl(0, 0%, 97%);
      --ck-content-color-image-caption-text: hsl(0, 0%, 20%);
      --ck-content-color-mention-background: hsla(341, 100%, 30%, 0.1);
      --ck-content-color-mention-text: hsl(341, 100%, 30%);
      --ck-color-table-caption-background: hsl(0, 0%, 97%);
      --ck-color-table-caption-text: hsl(0, 0%, 20%);
      --ck-content-highlight-marker-blue: hsl(201, 97%, 72%);
      --ck-content-highlight-marker-green: hsl(120, 93%, 68%);
      --ck-content-highlight-marker-pink: hsl(345, 96%, 73%);
      --ck-content-highlight-marker-yellow: hsl(60, 97%, 73%);
      --ck-content-highlight-pen-green: hsl(112, 100%, 27%);
      --ck-content-highlight-pen-red: hsl(0, 85%, 49%);
      --ck-image-style-spacing: 1.5em;
      --ck-inline-image-style-spacing: calc(var(--ck-image-style-spacing) / 2);
      --ck-todo-list-checkmark-size: 16px;
      --ck-border-radius: ${theme.borderRadius};

      font-size: ${theme.fontSizes[2]};
    }

    .ck.ck-reset.ck-dropdown__panel.ck-dropdown__panel_sw.ck-dropdown__panel-visible {
      border-radius: var(--ck-border-radius);
    }

    .ck-editor__main {
      --ck-font-face:
        'Source Sans Pro', system-ui, Roboto, 'Helvetica Neue', 'Helvetica', Arial, sans-serif;

      font-family: var(--ck-font-face);

      * {
        font: revert;
        margin: revert;
      }

      blockquote,
      ol,
      p,
      ul {
        font-size: 1em;
        line-height: 1.6em;
        padding-top: 0.2em;
        margin-bottom: var(--ck-spacing-large);
      }

      figcaption {
        background-color: var(--ck-content-color-image-caption-background);
        caption-side: bottom;
        color: var(--ck-content-color-image-caption-text);
        display: table-caption;
        font-size: 0.75em;
        outline-offset: -1px;
        padding: 0.6em;
        word-break: break-word;
      }

      a {
        text-decoration: none;
        color: #1b3af2;
      }

      a:hover {
        text-decoration: underline;
      }

      .table {
        margin: 0;
      }

      ul.todo-list {
        list-style: none;
        margin: revert;
        color: revert;
        font-family: revert;
        margin-left: 2rem;
      }

      ul,
      ol {
        list-style: initial;
        margin-left: 2rem;
      }

      ol {
        list-style: decimal;
      }

      sub {
        vertical-align: sub;
      }

      sup {
        vertical-align: super;
      }

      .ck-input-text.raw-html-embed__source,
      .ck-button.raw-html-embed__edit-button {
        color: var(--ck-color-text);
      }
    }
  `}
`;
const plugin = css`
  ${({ theme }) => css`
    .ck {
      scrollbar-width: thin;
      scrollbar-color: ${`${theme.colors.neutral300} ${theme.colors.neutral150}`};

      @-moz-document url-prefix() {
        scrollbar-width: auto;
      }
    }

    .ck.ck-content.ck-editor__editable {
      line-height: initial;
      height: auto;
      min-height: var(--ck-editor-min-height);
      border: none !important;
      max-width: var(--ck-editor-max-width) !important;
      margin: 0 auto;
      &.ck-focused:not(.ck-editor__nested-editable) {
        box-shadow: none;
      }
    }

    .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content {
      border: none !important;
    }

    [role='dialog'] .ck.ck-sticky-panel .ck-sticky-panel__content_sticky {
      position: static !important;
      width: auto !important;
    }

    [role='dialog'] .ck.ck-sticky-panel .ck-sticky-panel__placeholder {
      display: none !important;
    }

    .ck.ck-editor__main {
      min-height: var(--ck-editor-min-height) !important;
      max-height: var(--ck-editor-max-height) !important;
      overflow-y: auto;
      overflow-x: hidden;
      border-top: 1px solid var(--ck-color-base-border);
      border-bottom-left-radius: var(--ck-border-radius);
      border-bottom-right-radius: var(--ck-border-radius);
    }

    .ck .ck-source-editing-area,
    .ck .ck-source-editing-area textarea {
      color: var(--ck-color-text);
      background-color: var(--ck-color-base-background);
      border: none !important;
      box-shadow: none !important;
      min-height: var(--ck-editor-min-height);
      max-width: var(--ck-editor-max-width);
      margin: 0 auto;
    }

    .ck .ck-block-toolbar-button {
      min-width: 0 !important;
      min-height: 0 !important;
      width: 20px !important;
      height: 25px !important;
      margin-left: -2px !important ;

      & svg {
        color: var(--ck-color-text) !important;
        position: absolute;
        width: 20px;
        height: 20px;
      }
    }

    .ck-word-count {
      display: flex;
      position: absolute;
      justify-content: end;
      gap: 0.3rem;
      font-size: 1rem;
      font-weight: 500;
      text-transform: lowercase;
      z-index: 2;
      bottom: -2rem;
      right: 0;
    }

    .ck[dir='rtl'] {
      .ck-block-toolbar-button {
        margin-left: 2px !important ;
      }
      & + div {
        justify-content: flex-start;
        & > .ck-word-count {
          & > div:first-child {
            order: 2;
          }
          & > div:last-child {
            order: 1;
          }
        }
      }
    }

    .ck.ck-editor__editable > .ck-placeholder::before {
      color: var(--ck-content-font-color);
      opacity: 0.65;
    }

    .ck.ck-powered-by > a > svg > path:first-child {
      fill: ${theme.colors.neutral800};
    }
  `}
`;
const expanded = css`
  .ck-editor__expanded {
    max-width: var(--ck-editor-full-screen-box-max-width);

    .ck.ck-content.ck-editor__editable,
    .ck-source-editing-area {
      min-height: 100% !important;
      height: auto !important;
      max-height: none !important;
      border-radius: var(--ck-border-radius) !important;
      border: 1px solid var(--ck-color-base-border) !important;
      overflow: auto !important;
      box-sizing: border-box;
    }

    .ck.ck-editor__top {
      box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);
      z-index: var(--ck-z-panel);
    }

    .ck.ck-editor {
      display: flex;
      flex-direction: column;
    }

    .ck.ck-editor,
    .ck.ck-content,
    .ck.ck-editor__main {
      height: calc(100% - 0px) !important;
    }

    .ck.ck-editor__main {
      min-height: none !important;
      max-height: none !important;
      overflow-y: scroll !important;
      padding: calc(2 * var(--ck-spacing-large));
    }

    .ck-word-count {
      bottom: 0.3rem;
      right: 1.2rem;
    }
  }

  .ck-body-wrapper {
    pointer-events: all;
  }
`;
const common = css`
  ${reset}
  ${plugin}
  ${expanded}
`;
const editorSizes = css`
  :root {
    --ck-editor-full-screen-box-max-width: 1700px;
  }

  .ck {
    --ck-editor-max-width: 1366px;
    --ck-editor-min-height: 200px;
    --ck-editor-max-height: 500px;
  }
`;
const additional = css`
  ${editorSizes}
`;
const defaultTheme = {
  light,
  dark,
  common,
  additional
};
const mediaLibIcon = '<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.3.6a.9.9 0 100 1.8h15.311a.9.9 0 100-1.8H4.301zm17.1 3.7A1.6 1.6 0 0123 5.9v15.5a1.6 1.6 0 01-1.6 1.6H2.6A1.601 1.601 0 011 21.4V8 5.915C1 5.03 1.716 4.3 2.6 4.3h18.8zM5.032 19.18h14.336l-3.136-3.205-1.792 1.831-4.032-4.12-5.376 5.494zm13.44-8.697c0 1.282-.985 2.289-2.24 2.289-1.254 0-2.24-1.007-2.24-2.29 0-1.281.986-2.288 2.24-2.288 1.255 0 2.24 1.007 2.24 2.289z"></path></svg>';
class StrapiMediaLib extends Plugin {
  constructor() {
    super(...arguments);
    /**
     * Strapi function used to show media library modal.
     * Should be provided via connect method before using toggle method.
     */
    __publicField(this, "strapiToggle", null);
  }
  static get pluginName() {
    return "StrapiMediaLib";
  }
  init() {
    this.editor.ui.componentFactory.add("strapiMediaLib", () => {
      const button = new ButtonView();
      button.set({
        label: "Media Library",
        icon: mediaLibIcon,
        tooltip: true
      });
      button.on("execute", this.toggle.bind(this));
      return button;
    });
  }
  connect(strapiToggle) {
    if (typeof strapiToggle !== "function") {
      throw new Error("The input parameter for toggle must be a function.");
    }
    this.strapiToggle = strapiToggle;
  }
  toggle() {
    if (typeof this.strapiToggle !== "function") {
      throw new Error(
        "The Strapi Media Library toggle function is not connected. Use the connect function first."
      );
    }
    this.strapiToggle();
  }
}
const strapi = { "name": "ckeditor5" };
const pluginPkg = {
  strapi
};
const PLUGIN_ID = pluginPkg.strapi.name;
function isImageResponsive(imgFormats) {
  const formats = Object.keys(imgFormats);
  const isResponsive = !(formats.length === 1 && formats[0] === "thumbnail");
  return isResponsive;
}
function prefixFileUrlWithBackendUrl(fileURL) {
  return !!fileURL && fileURL.startsWith("/") ? `${window.strapi.backendURL}${fileURL}` : fileURL;
}
class StrapiUploadAdapter extends Plugin {
  static get requires() {
    return [FileRepository];
  }
  static get pluginName() {
    return "StrapiUploadAdapter";
  }
  init() {
  }
  initAdapter(config) {
    if (!config.uploadUrl) {
      logWarning("strapi-upload-adapter-missing-uploadurl");
      return;
    }
    this.editor.plugins.get(FileRepository).createUploadAdapter = (loader) => new Adapter(loader, config);
  }
}
class Adapter {
  /**
   * Creates a new adapter instance.
   */
  constructor(loader, config) {
    /**
     * FileLoader instance to use during the upload.
     */
    __publicField(this, "loader");
    /**
     * The configuration of the adapter.
     */
    __publicField(this, "config");
    __publicField(this, "xhr");
    this.loader = loader;
    this.config = config;
  }
  /**
   * Starts the upload process.
   */
  upload() {
    return this.loader.file.then(
      (file) => new Promise((resolve, reject) => {
        this.initRequest();
        this.initListeners(resolve, reject, file);
        this.sendRequest(file);
      })
    );
  }
  /**
   * Aborts the upload process.
   */
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  /**
   * Initializes the `XMLHttpRequest` object using the URL specified as
   * `strapiUpload.uploadUrl` in the editor's
   * configuration.
   */
  initRequest() {
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    xhr.open("POST", this.config.uploadUrl, true);
    xhr.responseType = "json";
  }
  /**
   * Initializes XMLHttpRequest listeners
   *
   * resolve - Callback function to be called when the request is successful.
   * reject - Callback function to be called when the request cannot be completed.
   * file - Native File object.
   */
  initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const { loader } = this;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;
    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const { response } = xhr;
      if (!Array.isArray(response) || typeof response === "object" && "error" in response || response.length !== 1) {
        return reject(
          response && response.error && response.error.message ? response.error.message : genericErrorText
        );
      }
      const { name, url, alternativeText, formats } = response[0];
      const urls = { default: prefixFileUrlWithBackendUrl(url) };
      const alt = alternativeText || name;
      if (formats && isImageResponsive(formats)) {
        const sortedFormatsKeys = Object.keys(formats).sort(
          (a, b) => formats[a].width - formats[b].width
        );
        sortedFormatsKeys.forEach((k) => {
          urls[formats[k].width] = prefixFileUrlWithBackendUrl(formats[k].url);
        });
      }
      resolve(url ? { alt, urls } : {});
      return void 0;
    });
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  /**
   * Prepares the data and sends the request.
   *
   * File - instance to be uploaded.
   */
  sendRequest(file) {
    const headers = this.config.headers || {};
    const withCredentials = this.config.withCredentials || false;
    Object.keys(headers).forEach((headerName) => {
      this.xhr.setRequestHeader(headerName, headers[headerName]);
    });
    this.xhr.withCredentials = withCredentials;
    const data = new FormData();
    data.append("files", file);
    this.xhr.send(data);
  }
}
function SpecialCharactersEmoji(editor) {
  const specialCharacters = editor.plugins.get(SpecialCharacters);
  specialCharacters.addItems("Emoji: Smileys", [
    { title: "grinning face", character: "😀" },
    { title: "grinning face with big eyes", character: "😃" },
    { title: "grinning face with smiling eyes", character: "😄" },
    { title: "beaming face with smiling eyes", character: "😁" },
    { title: "grinning squinting face", character: "😆" },
    { title: "grinning face with sweat", character: "😅" },
    { title: "rolling on the floor laughing", character: "🤣" },
    { title: "face with tears of joy", character: "😂" },
    { title: "slightly smiling face", character: "🙂" },
    { title: "upside down face", character: "🙃" },
    { title: "winking face", character: "😉" },
    { title: "smiling face with smiling eyes", character: "😊" },
    { title: "smiling face with halo", character: "😇" },
    { title: "smiling face with hearts", character: "🥰" },
    { title: "smiling face with heart-eyes", character: "😍" },
    { title: "star-struck", character: "🤩" },
    { title: "face blowing a kiss", character: "😘" },
    { title: "kissing face", character: "😗" },
    { title: "smiling face", character: "☺️" },
    { title: "kissing face with closed eyes", character: "😚" },
    { title: "kissing face with smiling eyes", character: "😙" }
  ]);
  specialCharacters.addItems("Emoji: Expressions", [
    { title: "face savoring food", character: "😋" },
    { title: "face with tongue", character: "😛" },
    { title: "winking face with tongue", character: "😜" },
    { title: "zany face", character: "🤪" },
    { title: "squinting face with tongue", character: "😝" },
    { title: "money-mouth face", character: "🤑" },
    { title: "smiling face with open hands", character: "🤗" },
    { title: "face with hand over mouth", character: "🤭" },
    { title: "shushing face", character: "🤫" },
    { title: "thinking face", character: "🤔" },
    { title: "zipper-mouth face", character: "🤐" },
    { title: "face with raised eyebrow", character: "🤨" },
    { title: "neutral face", character: "😐" },
    { title: "expressionless face", character: "😑" },
    { title: "face without mouth", character: "😶" },
    { title: "smirking face", character: "😏" },
    { title: "unamused face", character: "😒" },
    { title: "face with rolling eyes", character: "🙄" },
    { title: "grimacing face", character: "😬" },
    { title: "lying face", character: "🤥" }
  ]);
  specialCharacters.addItems("Emoji: Negative", [
    { title: "relieved face", character: "😌" },
    { title: "pensive face", character: "😔" },
    { title: "sleepy face", character: "😪" },
    { title: "drooling face", character: "🤤" },
    { title: "sleeping face", character: "😴" },
    { title: "face with medical mask", character: "😷" },
    { title: "face with thermometer", character: "🤒" },
    { title: "face with head-bandage", character: "🤕" },
    { title: "nauseated face", character: "🤢" },
    { title: "face vomiting", character: "🤮" },
    { title: "sneezing face", character: "🤧" },
    { title: "hot face", character: "🥵" },
    { title: "cold face", character: "🥶" },
    { title: "woozy face", character: "🥴" },
    { title: "dizzy face", character: "😵" },
    { title: "exploding head", character: "🤯" },
    { title: "cowboy hat face", character: "🤠" },
    { title: "partying face", character: "🥳" },
    { title: "smiling face with sunglasses", character: "😎" },
    { title: "nerd face", character: "🤓" },
    { title: "face with monocle", character: "🧐" }
  ]);
  specialCharacters.addItems("Emoji: Concerned", [
    { title: "confused face", character: "😕" },
    { title: "worried face", character: "😟" },
    { title: "slightly frowning face", character: "🙁" },
    { title: "frowning face", character: "☹️" },
    { title: "face with open mouth", character: "😮" },
    { title: "hushed face", character: "😯" },
    { title: "astonished face", character: "😲" },
    { title: "flushed face", character: "😳" },
    { title: "pleading face", character: "🥺" },
    { title: "frowning face with open mouth", character: "😦" },
    { title: "anguished face", character: "😧" },
    { title: "fearful face", character: "😨" },
    { title: "anxious face with sweat", character: "😰" },
    { title: "sad but relieved face", character: "😥" },
    { title: "crying face", character: "😢" },
    { title: "loudly crying face", character: "😭" },
    { title: "face screaming in fear", character: "😱" },
    { title: "confounded face", character: "😖" },
    { title: "persevering face", character: "😣" },
    { title: "disappointed face", character: "😞" },
    { title: "downcast face with sweat", character: "😓" },
    { title: "weary face", character: "😩" },
    { title: "tired face", character: "😫" },
    { title: "yawning face", character: "🥱" }
  ]);
  specialCharacters.addItems("Emoji: Angry", [
    { title: "face with steam from nose", character: "😤" },
    { title: "pouting face", character: "😡" },
    { title: "angry face", character: "😠" },
    { title: "face with symbols on mouth", character: "🤬" },
    { title: "smiling face with horns", character: "😈" },
    { title: "angry face with horns", character: "👿" },
    { title: "skull", character: "💀" },
    { title: "skull and crossbones", character: "☠️" }
  ]);
  specialCharacters.addItems("Emoji: Hands", [
    { title: "clapping hands", character: "👏" },
    { title: "raising hands", character: "🙌" },
    { title: "open hands", character: "👐" },
    { title: "palms up together", character: "🤲" },
    { title: "handshake", character: "🤝" },
    { title: "folded hands", character: "🙏" },
    { title: "writing hand", character: "✍️" },
    { title: "nail polish", character: "💅" },
    { title: "waving hand", character: "👋" },
    { title: "raised back of hand", character: "🤚" },
    { title: "hand with fingers splayed", character: "🖐️" },
    { title: "raised hand", character: "✋" },
    { title: "vulcan salute", character: "🖖" },
    { title: "OK hand", character: "👌" },
    { title: "pinching hand", character: "🤏" },
    { title: "victory hand", character: "✌️" },
    { title: "crossed fingers", character: "🤞" },
    { title: "love-you gesture", character: "🤟" },
    { title: "sign of the horns", character: "🤘" },
    { title: "call me hand", character: "🤙" },
    { title: "thumbs up", character: "👍" },
    { title: "thumbs down", character: "👎" },
    { title: "raised fist", character: "✊" },
    { title: "oncoming fist", character: "👊" },
    { title: "left-facing fist", character: "🤛" },
    { title: "right-facing fist", character: "🤜" }
  ]);
  specialCharacters.addItems("Emoji: Hearts", [
    { title: "red heart", character: "❤️" },
    { title: "orange heart", character: "🧡" },
    { title: "yellow heart", character: "💛" },
    { title: "green heart", character: "💚" },
    { title: "blue heart", character: "💙" },
    { title: "purple heart", character: "💜" },
    { title: "brown heart", character: "🤎" },
    { title: "black heart", character: "🖤" },
    { title: "white heart", character: "🤍" },
    { title: "heart with arrow", character: "💘" },
    { title: "heart with ribbon", character: "💝" },
    { title: "sparkling heart", character: "💖" },
    { title: "growing heart", character: "💗" },
    { title: "beating heart", character: "💓" },
    { title: "revolving hearts", character: "💞" },
    { title: "two hearts", character: "💕" },
    { title: "heart decoration", character: "💟" },
    { title: "heart exclamation", character: "❣️" },
    { title: "broken heart", character: "💔" },
    { title: "heart on fire", character: "❤️‍🔥" },
    { title: "mending heart", character: "❤️‍🩹" }
  ]);
  specialCharacters.addItems("Emoji: Common Symbols", [
    { title: "fire", character: "🔥" },
    { title: "star", character: "⭐" },
    { title: "glowing star", character: "🌟" },
    { title: "sparkles", character: "✨" },
    { title: "collision", character: "💥" },
    { title: "party popper", character: "🎉" },
    { title: "confetti ball", character: "🎊" },
    { title: "balloon", character: "🎈" },
    { title: "trophy", character: "🏆" },
    { title: "medal", character: "🏅" },
    { title: "check mark", character: "✅" },
    { title: "check mark button", character: "✔️" },
    { title: "cross mark", character: "❌" },
    { title: "warning", character: "⚠️" },
    { title: "prohibited", character: "🚫" },
    { title: "hundred points", character: "💯" },
    { title: "light bulb", character: "💡" },
    { title: "rocket", character: "🚀" },
    { title: "hourglass done", character: "⌛" },
    { title: "alarm clock", character: "⏰" },
    { title: "stopwatch", character: "⏱️" },
    { title: "timer clock", character: "⏲️" }
  ]);
  specialCharacters.addItems("Emoji: Food", [
    { title: "pizza", character: "🍕" },
    { title: "hamburger", character: "🍔" },
    { title: "hot dog", character: "🌭" },
    { title: "taco", character: "🌮" },
    { title: "burrito", character: "🌯" },
    { title: "bread", character: "🍞" },
    { title: "french fries", character: "🍟" },
    { title: "popcorn", character: "🍿" },
    { title: "coffee", character: "☕" },
    { title: "teacup without handle", character: "🍵" },
    { title: "beer mug", character: "🍺" },
    { title: "clinking beer mugs", character: "🍻" },
    { title: "wine glass", character: "🍷" },
    { title: "cocktail glass", character: "🍸" },
    { title: "birthday cake", character: "🎂" },
    { title: "shortcake", character: "🍰" },
    { title: "cookie", character: "🍪" },
    { title: "chocolate bar", character: "🍫" },
    { title: "candy", character: "🍬" },
    { title: "lollipop", character: "🍭" },
    { title: "doughnut", character: "🍩" },
    { title: "ice cream", character: "🍨" }
  ]);
  specialCharacters.addItems("Emoji: Animals", [
    { title: "dog face", character: "🐶" },
    { title: "cat face", character: "🐱" },
    { title: "mouse face", character: "🐭" },
    { title: "rabbit face", character: "🐰" },
    { title: "fox", character: "🦊" },
    { title: "bear", character: "🐻" },
    { title: "panda", character: "🐼" },
    { title: "koala", character: "🐨" },
    { title: "tiger face", character: "🐯" },
    { title: "lion", character: "🦁" },
    { title: "cow face", character: "🐮" },
    { title: "pig face", character: "🐷" },
    { title: "monkey face", character: "🐵" },
    { title: "see-no-evil monkey", character: "🙈" },
    { title: "hear-no-evil monkey", character: "🙉" },
    { title: "speak-no-evil monkey", character: "🙊" },
    { title: "unicorn", character: "🦄" },
    { title: "bird", character: "🐦" },
    { title: "penguin", character: "🐧" },
    { title: "chicken", character: "🐔" },
    { title: "hatching chick", character: "🐣" },
    { title: "baby chick", character: "🐤" },
    { title: "turtle", character: "🐢" },
    { title: "bug", character: "🐛" },
    { title: "butterfly", character: "🦋" },
    { title: "bee", character: "🐝" },
    { title: "lady beetle", character: "🐞" }
  ]);
  specialCharacters.addItems("Emoji: Nature", [
    { title: "sunflower", character: "🌻" },
    { title: "cherry blossom", character: "🌸" },
    { title: "rose", character: "🌹" },
    { title: "hibiscus", character: "🌺" },
    { title: "tulip", character: "🌷" },
    { title: "bouquet", character: "💐" },
    { title: "four leaf clover", character: "🍀" },
    { title: "seedling", character: "🌱" },
    { title: "evergreen tree", character: "🌲" },
    { title: "deciduous tree", character: "🌳" },
    { title: "palm tree", character: "🌴" },
    { title: "cactus", character: "🌵" },
    { title: "mushroom", character: "🍄" },
    { title: "sun", character: "☀️" },
    { title: "crescent moon", character: "🌙" },
    { title: "rainbow", character: "🌈" },
    { title: "cloud", character: "☁️" },
    { title: "snowflake", character: "❄️" },
    { title: "umbrella with rain drops", character: "☔" },
    { title: "droplet", character: "💧" },
    { title: "ocean wave", character: "🌊" }
  ]);
  specialCharacters.addItems("Emoji: Travel", [
    { title: "airplane", character: "✈️" },
    { title: "automobile", character: "🚗" },
    { title: "taxi", character: "🚕" },
    { title: "bus", character: "🚌" },
    { title: "train", character: "🚆" },
    { title: "bicycle", character: "🚲" },
    { title: "ship", character: "🚢" },
    { title: "anchor", character: "⚓" },
    { title: "camping", character: "🏕️" },
    { title: "beach with umbrella", character: "🏖️" },
    { title: "desert island", character: "🏝️" },
    { title: "mountain", character: "⛰️" },
    { title: "house", character: "🏠" },
    { title: "office building", character: "🏢" },
    { title: "castle", character: "🏰" },
    { title: "wedding", character: "💒" },
    { title: "Statue of Liberty", character: "🗽" },
    { title: "globe showing Europe-Africa", character: "🌍" },
    { title: "globe showing Americas", character: "🌎" },
    { title: "globe showing Asia-Australia", character: "🌏" }
  ]);
  specialCharacters.addItems("Emoji: Sports", [
    { title: "soccer ball", character: "⚽" },
    { title: "basketball", character: "🏀" },
    { title: "american football", character: "🏈" },
    { title: "baseball", character: "⚾" },
    { title: "tennis", character: "🎾" },
    { title: "volleyball", character: "🏐" },
    { title: "rugby football", character: "🏉" },
    { title: "8 ball", character: "🎱" },
    { title: "1st place medal", character: "🥇" },
    { title: "2nd place medal", character: "🥈" },
    { title: "3rd place medal", character: "🥉" },
    { title: "musical note", character: "🎵" },
    { title: "musical notes", character: "🎶" },
    { title: "microphone", character: "🎤" },
    { title: "headphone", character: "🎧" },
    { title: "guitar", character: "🎸" },
    { title: "video game", character: "🎮" },
    { title: "joystick", character: "🕹️" },
    { title: "game die", character: "🎲" },
    { title: "artist palette", character: "🎨" }
  ]);
  specialCharacters.addItems("Emoji: Objects", [
    { title: "mobile phone", character: "📱" },
    { title: "laptop", character: "💻" },
    { title: "computer mouse", character: "🖱️" },
    { title: "keyboard", character: "⌨️" },
    { title: "printer", character: "🖨️" },
    { title: "camera", character: "📷" },
    { title: "video camera", character: "📹" },
    { title: "television", character: "📺" },
    { title: "electric plug", character: "🔌" },
    { title: "battery", character: "🔋" },
    { title: "magnifying glass", character: "🔍" },
    { title: "locked", character: "🔒" },
    { title: "unlocked", character: "🔓" },
    { title: "key", character: "🔑" },
    { title: "wrench", character: "🔧" },
    { title: "hammer", character: "🔨" },
    { title: "envelope", character: "✉️" },
    { title: "incoming envelope", character: "📨" },
    { title: "e-mail", character: "📧" },
    { title: "memo", character: "📝" },
    { title: "briefcase", character: "💼" },
    { title: "file folder", character: "📁" },
    { title: "calendar", character: "📅" },
    { title: "pushpin", character: "📌" },
    { title: "paperclip", character: "📎" },
    { title: "scissors", character: "✂️" },
    { title: "book", character: "📖" },
    { title: "newspaper", character: "📰" },
    { title: "money bag", character: "💰" },
    { title: "dollar banknote", character: "💵" },
    { title: "euro banknote", character: "💶" },
    { title: "credit card", character: "💳" },
    { title: "shopping cart", character: "🛒" },
    { title: "gift", character: "🎁" }
  ]);
  specialCharacters.addItems("Emoji: Flags", [
    { title: "Italy flag", character: "🇮🇹" },
    { title: "United States flag", character: "🇺🇸" },
    { title: "United Kingdom flag", character: "🇬🇧" },
    { title: "France flag", character: "🇫🇷" },
    { title: "Germany flag", character: "🇩🇪" },
    { title: "Spain flag", character: "🇪🇸" },
    { title: "Japan flag", character: "🇯🇵" },
    { title: "China flag", character: "🇨🇳" },
    { title: "Brazil flag", character: "🇧🇷" },
    { title: "Canada flag", character: "🇨🇦" },
    { title: "Australia flag", character: "🇦🇺" },
    { title: "India flag", character: "🇮🇳" },
    { title: "Russia flag", character: "🇷🇺" },
    { title: "European Union flag", character: "🇪🇺" },
    { title: "white flag", character: "🏳️" },
    { title: "rainbow flag", character: "🏳️‍🌈" },
    { title: "checkered flag", character: "🏁" }
  ]);
}
const editorConfig$1 = {
  licenseKey: "GPL",
  plugins: [
    Alignment,
    Autoformat,
    AutoImage,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    List,
    ListProperties,
    Link,
    LinkImage,
    MediaEmbed,
    Paragraph,
    PageBreak,
    PasteFromOffice,
    PictureEditing,
    RemoveFormat,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersEmoji,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    ShowBlocks,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TodoList,
    Underline,
    WordCount,
    StrapiMediaLib,
    StrapiUploadAdapter
  ],
  toolbar: [
    "showBlocks",
    "|",
    "heading",
    "|",
    "fontSize",
    "fontFamily",
    "alignment",
    {
      label: "Indentation",
      icon: IconIndent,
      items: ["outdent", "indent"]
    },
    "bulletedList",
    "numberedList",
    "todoList",
    "link",
    "mediaEmbed",
    "insertImage",
    "strapiMediaLib",
    "blockquote",
    "insertTable",
    "codeBlock",
    "htmlEmbed",
    "SourceEditing",
    "specialCharacters",
    "horizontalLine",
    "pageBreak",
    "|",
    "undo",
    "redo"
  ],
  balloonToolbar: [
    "bold",
    "italic",
    "fontColor",
    "fontBackgroundColor",
    {
      label: "Other formatting options",
      icon: `
      <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" fill="none" width="24" height="24"/>
      <g>
      <path d="M14.348 12H21v2h-4.613c.24.515.368 1.094.368 1.748 0 1.317-.474 2.355-1.423 3.114-.947.76-2.266 1.138-3.956 1.138-1.557 0-2.934-.293-4.132-.878v-2.874c.985.44 1.818.75 2.5.928.682.18 1.306.27 1.872.27.68 0 1.2-.13 1.562-.39.363-.26.545-.644.545-1.158 0-.285-.08-.54-.24-.763-.16-.222-.394-.437-.704-.643-.18-.12-.483-.287-.88-.49H3v-2H14.347zm-3.528-2c-.073-.077-.143-.155-.193-.235-.126-.202-.19-.44-.19-.713 0-.44.157-.795.47-1.068.313-.273.762-.41 1.348-.41.492 0 .993.064 1.502.19.51.127 1.153.35 1.93.67l1-2.405c-.753-.327-1.473-.58-2.16-.76-.69-.18-1.414-.27-2.173-.27-1.544 0-2.753.37-3.628 1.108-.874.738-1.312 1.753-1.312 3.044 0 .302.036.58.088.848h3.318z"/>
      </g>
      </svg>`,
      items: ["underline", "strikethrough", "superscript", "subscript"]
    },
    "|",
    "removeFormat"
  ],
  fontFamily: {
    supportAllValues: true
  },
  fontSize: {
    options: [10, 12, 14, "default", 18, 20, 22],
    supportAllValues: true
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2"
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3"
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4"
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5"
      },
      {
        model: "heading6",
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6"
      }
    ]
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true
      }
    ],
    disallow: [
      {
        attributes: [
          { key: /^on(.*)/i, value: true },
          {
            key: /.*/,
            value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i
          },
          { key: /.*/, value: /data:(?!image\/(png|jpeg|gif|webp))/i }
        ]
      },
      { name: "script" }
    ]
  },
  htmlEmbed: {
    showPreviews: true,
    sanitizeHtml: (inputHtml) => {
      const outputHtml = DOMPurify.sanitize(inputHtml);
      return {
        html: outputHtml,
        hasChanged: true
      };
    }
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
      "toggleTableCaption"
    ]
  },
  image: {
    styles: {
      options: [
        "inline",
        "alignLeft",
        "alignRight",
        "alignCenter",
        "alignBlockLeft",
        "alignBlockRight",
        "block",
        "side"
      ]
    },
    resizeOptions: [
      {
        name: "resizeImage:original",
        label: "Default image width",
        value: null
      },
      {
        name: "resizeImage:50",
        label: "50% page width",
        value: "50"
      },
      {
        name: "resizeImage:75",
        label: "75% page width",
        value: "75"
      }
    ],
    toolbar: [
      "imageTextAlternative",
      "toggleImageCaption",
      "linkImage",
      "|",
      "imageStyle:inline",
      "imageStyle:wrapText",
      "imageStyle:breakText",
      "imageStyle:side",
      "|",
      "resizeImage"
    ]
  },
  link: {
    decorators: {
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file"
        }
      }
    },
    addTargetToExternalLinks: true,
    defaultProtocol: "https://"
  },
  ui: {
    poweredBy: {
      position: "inside",
      side: "left",
      label: "",
      verticalOffset: 0,
      horizontalOffset: 0
    }
  }
};
const defaultHtmlPreset = {
  name: "defaultHtml",
  description: "Default HTML editor",
  editorConfig: editorConfig$1
};
const editorConfig = {
  licenseKey: "GPL",
  plugins: [
    Autoformat,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    Heading,
    HorizontalLine,
    Image,
    ImageToolbar,
    ImageUpload,
    ImageInsert,
    Italic,
    List,
    Link,
    Markdown,
    Paragraph,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersEssentials,
    Strikethrough,
    Table,
    TableToolbar,
    TextTransformation,
    TodoList,
    WordCount,
    StrapiMediaLib,
    StrapiUploadAdapter
  ],
  toolbar: [
    "sourceEditing",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "fontColor",
    "strikethrough",
    "code",
    "bulletedList",
    "numberedList",
    "todoList",
    "link",
    "insertImage",
    "strapiMediaLib",
    "blockQuote",
    "insertTable",
    "codeBlock",
    "specialCharacters",
    "horizontalLine",
    "undo",
    "redo"
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2"
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3"
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4"
      },
      {
        model: "heading5",
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5"
      },
      {
        model: "heading6",
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6"
      }
    ]
  },
  image: {
    toolbar: ["imageTextAlternative"]
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  },
  ui: {
    poweredBy: {
      position: "inside",
      side: "left",
      label: "",
      verticalOffset: 0,
      horizontalOffset: 0
    }
  }
};
const defaultMarkdownPreset = {
  name: "defaultMarkdown",
  description: "Default Markdown editor",
  editorConfig
};
const PLUGIN_CONFIG = {
  presets: {
    defaultHtml: defaultHtmlPreset,
    defaultMarkdown: defaultMarkdownPreset
  },
  theme: defaultTheme
};
function setPluginConfig(userPluginConfig) {
  const { presets: userPresets, theme: userTheme } = userPluginConfig || {};
  if (userPresets) {
    PLUGIN_CONFIG.presets = {};
    userPresets.forEach((preset) => {
      PLUGIN_CONFIG.presets[preset.name] = preset;
    });
  }
  if (userTheme) {
    PLUGIN_CONFIG.theme = userTheme;
  }
}
function getPluginPresets() {
  return PLUGIN_CONFIG.presets;
}
function getPluginTheme() {
  return PLUGIN_CONFIG.theme;
}
function getPluginConfig() {
  return PLUGIN_CONFIG;
}
const clonedDefaultTheme = cloneDeep(defaultTheme);
const clonedDefaultHtmlPreset = cloneDeep(defaultHtmlPreset);
const clonedDefaultMarkdownPreset = cloneDeep(defaultMarkdownPreset);
const exports$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  StrapiMediaLib,
  StrapiUploadAdapter,
  defaultHtmlPreset: clonedDefaultHtmlPreset,
  defaultMarkdownPreset: clonedDefaultMarkdownPreset,
  defaultTheme: clonedDefaultTheme,
  getPluginPresets,
  getPluginTheme,
  setPluginConfig
}, Symbol.toStringTag, { value: "Module" }));
function CKEditorIcon() {
  return /* @__PURE__ */ jsx(IconBox, { justifyContent: "center", alignItems: "center", width: 7, height: 6, hasRadius: true, "aria-hidden": true, children: /* @__PURE__ */ jsx(SvgIcon, {}) });
}
function SvgIcon() {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-8 -7 37 37", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M15.04 16.726a3.98 3.98 0 0 0-1.535.524 3.96 3.96 0 0 0-1.402 1.364c-.108.18-.716 1.347-.716 1.347l-2.09 3.82.022.016c.097.063.2.116.308.159.317.113.65.175.987.18 1.264.058 2.529-.016 3.793-.007.725.023 1.45.005 2.172-.053.348-.017.687-.117.99-.29.31-.178.576-.423.78-.717.138-.205.283-.407.409-.62.6-1.02 1.199-2.043 1.794-3.065.187-.321.37-.644.555-.966l.281-.481c.236-.392.367-.838.381-1.294l-3.258.057s-3.147-.012-3.472.026Zm2.764.903Z",
        fill: lightTheme.colors.secondary700
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "m7.12 22.61 1.901-3.477.46-.877c-.31-.168-.614-.35-.918-.528-.866-.508-1.766-.957-2.613-1.498a2.459 2.459 0 0 1-.609-.517c-.27-.336-.341-.736-.362-1.15-.052-1.022-.003-2.045-.02-3.068-.01-.487 0-.975.005-1.462.01-.806.384-1.382 1.069-1.783L8.115 7.03c.55-.322 1.102-.642 1.654-.961.127-.073.263-.13.395-.192.68-.321 1.298-.119 1.9.213.039.02.075.045.112.068.306.149.605.313.895.491.794.445 1.587.893 2.378 1.343.239.139.469.292.688.458.485.36.636.875.666 1.445.039.71.017 1.422.013 2.134-.002.698.01 1.396.003 2.094 1.478-.006 3.146 0 3.146 0l1.807-.032c-.006-.73-.016-1.46-.017-2.19 0-1.31.037-2.62-.039-3.928-.061-1.05-.34-2-1.232-2.666a12.549 12.549 0 0 0-1.264-.848c-1.454-.834-2.91-1.664-4.37-2.49-.545-.308-1.067-.659-1.644-.91-.069-.043-.135-.089-.205-.128-1.106-.613-2.24-.992-3.485-.405-.242.115-.49.218-.723.352-1.011.58-2.02 1.166-3.026 1.757-1.271.744-2.54 1.488-3.81 2.234C.705 5.602.025 6.66.012 8.144c-.008.897-.02 1.794 0 2.691.039 1.884-.045 3.77.058 5.652.042.761.174 1.499.672 2.12.32.377.698.7 1.121.956 1.556 1.001 3.209 1.835 4.8 2.775l.457.271Z",
        fill: lightTheme.colors.secondary600
      }
    )
  ] });
}
const IconBox = styled(Flex)`
  background-color: ${lightTheme.colors.secondary100};
  border: 1px solid ${lightTheme.colors.secondary200};
`;
const AVAILABLE_OPTIONS = [];
const PRESET_OPTION = {
  intlLabel: {
    id: `${PLUGIN_ID}.preset.label`,
    defaultMessage: "Preset"
  },
  description: {
    id: `${PLUGIN_ID}.preset.description`,
    defaultMessage: " "
  },
  name: "options.preset",
  type: "select",
  options: AVAILABLE_OPTIONS,
  defaultValue: ""
};
function fillAvailableOptions() {
  const { presets } = getPluginConfig();
  Object.values(presets).forEach(({ name, description }) => {
    const option = {
      key: name,
      value: name,
      metadatas: {
        intlLabel: {
          id: `${PLUGIN_ID}.preset.${name}.label`,
          defaultMessage: description
        }
      }
    };
    AVAILABLE_OPTIONS.push(option);
  });
  PRESET_OPTION.defaultValue = AVAILABLE_OPTIONS[0]?.value ?? "";
}
const index = {
  bootstrap() {
    fillAvailableOptions();
  },
  async register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      isReady: true,
      name: "CKEditor",
      apis: exports$1
    });
    app.customFields.register({
      name: "CKEditor",
      type: "richtext",
      pluginId: PLUGIN_ID,
      icon: CKEditorIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: "CKEditor 5"
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage: "The advanced rich text editor. (Community Edition)"
      },
      components: {
        Input: async () => import("./Field-DYVKXPbF.mjs").then((module) => ({
          default: module.Field
        }))
      },
      options: {
        base: [PRESET_OPTION],
        advanced: [
          {
            name: "required",
            type: "checkbox",
            intlLabel: {
              id: `${PLUGIN_ID}.required.label`,
              defaultMessage: "Required field"
            },
            description: {
              id: `${PLUGIN_ID}.required.description`,
              defaultMessage: "You won't be able to create an entry if this field is empty"
            }
          },
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.options.advanced.limiters`,
              defaultMessage: "Input limiters"
            },
            items: [
              {
                name: "options.maxLengthWords",
                type: "checkbox-with-number-field",
                intlLabel: {
                  id: `${PLUGIN_ID}.maxLengthWords.label`,
                  defaultMessage: "Words limit"
                }
              },
              {
                name: "options.maxLengthCharacters",
                type: "checkbox-with-number-field",
                intlLabel: {
                  id: `${PLUGIN_ID}.maxLengthCharacters.label`,
                  defaultMessage: "Characters limit"
                }
              }
            ]
          }
        ]
      }
    });
  }
};
export {
  StrapiMediaLib as S,
  StrapiUploadAdapter as a,
  index as b,
  clonedDefaultHtmlPreset as c,
  clonedDefaultMarkdownPreset as d,
  clonedDefaultTheme as e,
  getPluginPresets as f,
  getPluginConfig as g,
  getPluginTheme as h,
  isImageResponsive as i,
  prefixFileUrlWithBackendUrl as p,
  setPluginConfig as s
};
