"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class ObjectClass {
    constructor() {
        this.LocationInputField = protractor_1.element(protractor_1.By.id("bigsearch-query-detached-query"));
        this.FirstSearchedLocation = protractor_1.element(protractor_1.By.xpath("//ul[@id='Koan-magic-carpet-koan-search-bar__listbox']//li[@role='option'][1]"));
        this.GuestDropdown = protractor_1.element(protractor_1.By.xpath("//button[@data-testid='structured-search-input-field-guests-button']"));
        this.SearchButton = protractor_1.element(protractor_1.By.xpath("//div[@class='_rrbixv']//button[@type='button']"));
        this.AdultsAddIcon = protractor_1.element(protractor_1.By.xpath("//div[@id='stepper-adults']//button[@aria-label='increase value']"));
        this.ChildrenAddIcon = protractor_1.element(protractor_1.By.xpath("//div[@id='stepper-children']//button[@aria-label='increase value']"));
        this.MoveToNextMonthIcon = protractor_1.element(protractor_1.By.xpath("//div[@aria-label='Move forward to switch to the next month.']//button"));
        this.GuestsFilter = protractor_1.element(protractor_1.By.xpath("//div[@role='search']//button[3]"));
        this.DatesFilter = protractor_1.element(protractor_1.By.xpath("//div[@role='search']//button[2]"));
        this.LocationFilter = protractor_1.element(protractor_1.By.xpath("//div[@role='search']//button[1]"));
        this.MoreFiltersButton = protractor_1.element(protractor_1.By.xpath("//span[contains(text(),'More filters')]//parent::button[@type='button']"));
        this.BedroomAddIcon = protractor_1.element(protractor_1.By.xpath("//div[@id='filterItem-stepper-min_bedrooms-0']//*[@aria-label='increase value']"));
        this.PoolCheckBox = protractor_1.element(protractor_1.By.xpath("//input[contains(@id,'filterItem-checkbox-amenities') and contains(@name,'Pool')]//following-sibling::span"));
        this.ShowStaysButton = protractor_1.element(protractor_1.By.xpath("//button[@type='button' and contains(text(),'Show')]"));
        this.FirstPropertyCard = protractor_1.element(protractor_1.By.xpath("//div[@class='_8ssblpx'][1]//a[@data-check-info-section='true']"));
        this.AmenitiesHyperLink = protractor_1.element(protractor_1.By.xpath("//a[contains(text(),'Show all') and contains(text(),'amenities')]"));
        this.PoolFacility = protractor_1.element(protractor_1.By.xpath("//div[contains(text(),'Pool')]"));
        this.FirstPropertyMapLocation = protractor_1.element(protractor_1.By.xpath("//button[@data-veloute='map/markers/BasePillMarker']//span[@class='_1nq36y92']//parent::div"));
        this.FirstPropertyNameOnCard = protractor_1.element(protractor_1.By.xpath("//div[@class='_8ssblpx'][1]//div[@class='_1c2n35az']"));
        this.PropertyNameOnMapPopup = protractor_1.element(protractor_1.By.xpath("//div[@class='_v96gnbz']"));
    }
}
exports.ObjectClass = ObjectClass;
