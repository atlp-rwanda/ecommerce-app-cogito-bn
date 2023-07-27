import { assert } from 'chai';
import { JSDOM } from 'jsdom';
import {
  describe, it, before,
} from 'mocha';
import FooterComponent from '../utils/_email_/emailFooter'; // Adjust the import path based on the location of your FooterComponent file.

describe('FooterComponent', () => {
  let document;
  let footerElement;

  before(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div>${FooterComponent}</div>`);
    document = dom.window.document;
    footerElement = document.querySelector('h2');
  });

  it('should display the footer component correctly', () => {
    const footerText = footerElement.textContent.trim();

    assert.strictEqual(footerText, 'All Rights Reserved By Cogito | 2023');
  });
});
