import { assert } from 'chai';
import {JSDOM} from 'jsdom';
import HeaderComponent from '../utils/_email_/emailHeader';

describe('HeaderComponent', () => {
  let document;
  let headerElement;

  before(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div>${HeaderComponent}</div>`);
    document = dom.window.document;
    headerElement = document.querySelector('h2');
  });

  it('should display the header component correctly', () => {
    const headerText = headerElement.textContent.trim();
    const headerImageSrc = document.querySelector('img').getAttribute('src');

    assert.strictEqual(headerText, 'Cogitto Ecommerce');
    assert.strictEqual(
      headerImageSrc,
      'https://drive.google.com/uc?export=view&id=1yTJpWt4P5e7xClbsR_IFGKiczhqWTpt3',
    );
  });
});
