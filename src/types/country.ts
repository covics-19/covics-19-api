export interface Country {
    country_code: string;
    country_name: string;
    resources_capacity: number;
    confirmed: number;
    deaths: number;
    recovered: number;
    confirmed_prediction_3w: number;
    deaths_prediction_3w: number;
    recovered_prediction_3w: number;
}