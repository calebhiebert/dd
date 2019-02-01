import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

/**
 * Provides custom Marked options for markdown parsing
 */
export const markedOptionsFactory = (): MarkedOptions => {
  const renderer = new MarkedRenderer();

  renderer.table = (header, body) => {
    return `<table class="table table-striped table-hover"><thead>${header}</thead><tbody>${body}</tbody></table>`;
  };

  return {
    renderer: renderer,
  };
};
