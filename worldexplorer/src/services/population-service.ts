import { PopulationService } from "./population-service.intf";
import { Country, DataPoint } from "../domain";
import {
  WorldBankApiV2,
  worldBankApiV2CountryInformationValidator,
  WorldBankApiV2CountryResponse,
  worldBankApiV2CountryResponseValidator,
  WorldBankApiV2Formats,
  WorldBankApiV2Params,
} from "./world-bank-api";
import { ThrowReporter } from "io-ts/lib/ThrowReporter";

export class PopulationServiceImpl implements PopulationService {
  private readonly countriesApiBaseUrl: string;

  constructor(baseUrl: string) {
    if (baseUrl || baseUrl.trim().length === 0) {
      throw new Error("The base URL must be provided!");
    } else if (
      !baseUrl.toLowerCase().startsWith("https://") &&
      !baseUrl.toLowerCase().startsWith("http://")
    ) {
      throw new Error(
        "The URL looks invalid. it should start with https:// or http://"
      );
    }

    let cleanBaseUrl = baseUrl.trim();
    if (cleanBaseUrl.endsWith("/")) {
      cleanBaseUrl = cleanBaseUrl.substr(0, cleanBaseUrl.lastIndexOf("/"));
    }
    this.countriesApiBaseUrl = `${cleanBaseUrl}/${WorldBankApiV2.VERSION}/${WorldBankApiV2.COUNTRIES_API_PREFIX}`;
    console.log(
      `Population service initialized.\nCountries API URL: [${this.countriesApiBaseUrl}]`
    );
  }

  async checkResponseStatus(response: Response): Promise<Response> {
    if (!response) {
      throw new Error("A response must be provided");
    }
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  async getJsonContent(response: Response): Promise<unknown> {
    if (!response) {
      throw new Error("A response must be provided!");
    }
    let jsonContent: unknown = undefined;
    try {
      jsonContent = await response.json();
    } catch (error) {
      console.error("Failed to parse the response as JSON: ", error);
      throw new Error(
        `Could not parse the response body as JSON. Error: ${error.message}`
      );
    }
    return jsonContent;
  }
  async getAllCountries(): Promise<Country[]> {
    const response: Response = await fetch(
      `${this.countriesApiBaseUrl}?${WorldBankApiV2Params.FORMAT}=${WorldBankApiV2Formats.JSON}&${WorldBankApiV2Params.PER_PAGE}=320`
    );

    const checkedResponse: Response = await this.checkResponseStatus(response);
    let jsonContent: unknown = await this.getJsonContent(checkedResponse);
    const validationResult =
      worldBankApiV2CountryResponseValidator.decode(jsonContent);

    ThrowReporter.report(validationResult); // <5>
    console.log("Response received and validated");

    const countries = (
      validationResult.value as WorldBankApiV2CountryResponse
    )[1];
    console.log(`Found ${countries.length} countries`);

    let retVal: Country[] = countries.map(
      (country) =>
        new Country(
          country.name,
          country.id,
          country.iso2Code,
          country.capitalCity,
          country.longitude,
          country.latitude
        )
    );
    return retVal;
  }
  async getCountry(countryCode: string): Promise<Country> {
    if (!countryCode || "" === countryCode.trim()) {
      throw new Error("The country code must be provided");
    }
    const response: Response = await fetch(
      `${this.countriesApiBaseUrl}/${countryCode}?${WorldBankApiV2Params.FORMAT}=${WorldBankApiV2Formats.JSON}`
    );
    const checkedResponse: Response = await this.checkResponseStatus(response);
    const jsonContent: unknown = await this.getJsonContent(checkedResponse);
    const validationResult =
      worldBankApiV2CountryResponseValidator.decode(jsonContent);
    ThrowReporter.report(validationResult);

    const countries = (
      validationResult.value as WorldBankApiV2CountryResponse
    )[1];
    if (countries.length > 1) {
      return Promise.reject(
        "More than one country was returned. This should not happen"
      );
    }

    const country = countries[0];
    return new Country(
      country.name,
      country.id,
      country.iso2Code,
      country.capitalCity,
      country.longitude,
      country.latitude
    );
  }
  getTotalPopulation(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getMalePopulation(country: Country, dateRange: string): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getFemalePopulation(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getLifeExpectancy(country: Country, dateRange: string): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getAdultMaleLiteracy(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getAdultFemaleLiteracy(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getMaleSurvivalToAge65(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
  getFemaleSurvivalToAge65(
    country: Country,
    dateRange: string
  ): Promise<DataPoint[]> {
    throw new Error("Method not implemented.");
  }
}
