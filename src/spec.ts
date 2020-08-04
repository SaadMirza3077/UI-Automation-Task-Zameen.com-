
import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';
import { async } from 'q';
import { ObjectClass } from '../ObjectClass';
import { Utility } from '../Utility';
import { protractor } from 'protractor/built/ptor';


describe('Verify that the results match the search criteria', function () {


  let obj = new ObjectClass();
  let utility = new Utility();

  let EC = ExpectedConditions;
  let condition;

  let SearchedText= "Rome, Italy"

  it('Open www.airbnb.com.', async function () {

    await browser.driver.manage().window().maximize();
    await browser.waitForAngularEnabled(false);
    await browser.get('https://www.airbnb.com/');
    await console.log("airbnb application opened");

  })

  it('Enter the search criteria', async function () {

    await browser.wait(EC.visibilityOf(obj.LocationInputField),20000);
    await obj.LocationInputField.click();
    await obj.LocationInputField.sendKeys(SearchedText);
    await obj.LocationInputField.sendKeys(protractor.Key.ENTER);
    await console.log("Data entered in Location field");

    var CheckInDate = await utility.GetSpecificDate(7);
    await console.log(CheckInDate);

    try {
      await browser.wait(EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]"))), 6000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
      await console.log("CheckIn Date clicked");
    }
    catch (Except) {
      await browser.wait(EC.visibilityOf(obj.MoveToNextMonthIcon), 6000);
      await obj.MoveToNextMonthIcon.click();
      await console.log("Next month icon clicked on calendar");
      
      condition = await EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")));
      await browser.wait(condition, 3000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckInDate + "')]")).click();
      await console.log("CheckIn Date clicked");
    }

    var CheckOutDate = await utility.GetSpecificDate(14);
    await console.log(CheckOutDate);

    try {
      await browser.wait(EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]"))), 6000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
      await console.log("CheckOut Date clicked");
    }
    catch (Except) {
      await browser.wait(EC.visibilityOf(obj.MoveToNextMonthIcon), 6000);
      await obj.MoveToNextMonthIcon.click();
      await console.log("Next month icon clicked on calendar");
     
      condition = await EC.visibilityOf(element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")));
      await browser.wait(condition, 3000);
      await element(By.xpath("//td[@role='button' and contains(@aria-label,'" + CheckOutDate + "')]")).click();
      await console.log("CheckOut Date clicked");
    }

    await browser.wait(EC.visibilityOf(obj.GuestDropdown), 6000);
    await obj.GuestDropdown.click();
    await console.log("Guest dropdown clicked");

    await browser.wait(EC.visibilityOf(obj.AdultsAddIcon), 6000);
    await obj.AdultsAddIcon.click();
    await obj.AdultsAddIcon.click();
    await console.log("2 Adults added as Guest");

    await browser.wait(EC.visibilityOf(obj.ChildrenAddIcon), 6000);
    await obj.ChildrenAddIcon.click();
    await console.log("1 Child added as Guest");

    await browser.wait(EC.visibilityOf(obj.GuestDropdown), 6000);
    await obj.GuestDropdown.click();
    await console.log("Guest dropdown clicked");

    await browser.wait(EC.visibilityOf(obj.SearchButton), 6000);
    await obj.SearchButton.click();
    await console.log("Search button clicked");

  });

  it('Verify that the applied filters are correct.', async function () {

    condition = await EC.visibilityOf(obj.GuestsFilter);
    await browser.wait(condition, 30000);

    var txt = await obj.GuestsFilter.getText();
    await expect(txt).toContain("3 guests", "Applied filter of guests is incorrect");
    await console.log("Applied filter of guests is correct");

    var date = await utility.GetFilterDate();
    await console.log(date);

    await browser.wait(EC.visibilityOf(obj.DatesFilter), 6000);
    var filterdate = await obj.DatesFilter.getText();
    await console.log(filterdate);
    await expect(filterdate).toContain(date, "Applied filter of date is incorrect");
    await console.log("Applied filter of date is correct");

  });

  it('Verify that the properties displayed on the first page can accommodate at least the selected number of guests.', async function () {

    condition = await EC.visibilityOf(element(by.xpath("//div[@class='_kqh46o'][1]")));
    await browser.wait(condition, 30000);

    var list = await element.all(By.xpath("//div[@class='_kqh46o'][1]")).count();
    await console.log(list);

    for (let i = await 1; await i <= list; await i++) {

      var txt: any;
      var rem: any;

      try {
        txt = await element(By.xpath("//div[@class='_8ssblpx'][" + i + "]//div[@class='_kqh46o'][1]")).getText();
      }
      catch (Except) {
        rem = (list - i) + 1;
        txt = await element(By.xpath("//div[@class='_1gw6tte']//div[@style='margin-top: 24px;']//following-sibling::div//div[@class='_fhph4u']//div[@class='_8ssblpx'][" + rem + "]//div[@class='_1s7voim'][1]")).getText();
      }

      await console.log(txt);

      var txt1 = await txt.split("·");
      await console.log(txt1[0]);

      var num = await txt1[0].match(/\d+/g);
      var numb = await Number(num);

      await console.log(num);
      await console.log(numb);

      if (numb >= 3) {
        await expect(true).toBe(true);
        await console.log("Card " + i + " criteria passed");
      }
      else {
        await console.log("Card " + i + " criteria failed");
        await expect(true).toBe(false);
      }

    }

  });

});
