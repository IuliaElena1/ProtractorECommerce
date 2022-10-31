const { element } = require("protractor");

describe('Using any public e-commerce site provide a test framework that tests successfully add/remove two products', function() {
  it('Shopping test',  async function() {
    
    
    await browser.waitForAngularEnabled(false);
    browser.driver.manage().window().maximize();
        
    
    browser.get('https://www.emag.ro');

    
    let firstProductAdded = await element(by.css('#main-container > div > section:nth-child(3) > div > div > div:nth-child(6) > div.ph-scroller > div > div:nth-child(1) > div > div > div.card-v2-content.card-v2-atc-updated > div.card-v2-atc.mrg-top-xxs > form > button'));
    await ClickButton(firstProductAdded);

    // close aria label
    let ariaLabel = await element(by.css('[aria-label="Inchide"]'));
    await ClickButton(ariaLabel);

    let secondProductAdded = await element(by.css('#purchased-product-pac-carousel > div > div > div:nth-child(1) > div > div > div.card-v2-content.card-v2-atc-updated > div.card-v2-atc.mrg-top-xxs > form > button'));
    await ClickButton(secondProductAdded);
     

    var productNr = await element(by.css('#my_cart > span.jewel.jewel-danger'));
    await browser.wait(ExpectedConditions.elementToBeClickable(productNr), 10000, 'Waiting for productNr button to be clickable');
    await expect(productNr.getText()).toEqual('2');


    //click to basket
    var basketButton = await element(by.id('my_cart'));  
    await ClickButton(basketButton);

    // remove one product 
    var firstRemovedProduct = await element(by.css('#vendorsContainer > div:nth-child(1) > div.cart-widget.cart-line > div > div.main-product-details-container.emg-right > div.line-item.line-item-main > div.line-price-container.emg-right > a.emg-right.remove-product.btn-remove-product.gtm_rp080219'));
    await ClickButton(firstRemovedProduct);
    browser.sleep(300);

    await browser.refresh();
    browser.sleep(300);
    expect(await productNr.getText()).toEqual('1');


    // remove second product
    var secondRemovedProduct = await element(by.css('#vendorsContainer > div > div.cart-widget.cart-line > div > div.main-product-details-container.emg-right > div.line-item.line-item-main > div.line-price-container.emg-right > a.emg-right.remove-product.btn-remove-product.gtm_rp080219'));
    await ClickButton(secondRemovedProduct);
    browser.sleep(300);


    await browser.refresh();
    browser.sleep(300);
    expect(await productNr.getText()).toEqual('');

    var EC = protractor.ExpectedConditions;
    browser.wait(EC.not(EC.elementToBeClickable(secondRemovedProduct, 5000))); 
   })
});

async function ClickButton(buttonElement) {
  await browser.wait(ExpectedConditions.elementToBeClickable(buttonElement), 10000, 'Waiting for button to be clickable');
  await buttonElement.click();
}
