import slugify from 'slugify';

const SlugfyFunction = (text) => slugify(text, {
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'en',
});
export default SlugfyFunction;
