import { 
    CountryPrediction, 
    ParsedCountryPrediction, 
    ParsedPredictions, 
    Predictions
} from '../types/prediction';

export function parseCountryPrediction(prediction: CountryPrediction): ParsedCountryPrediction {
    const resources_prediction_3w = 
        prediction.confirmed_prediction_3w - prediction.deaths_prediction_3w - prediction.recovered_prediction_3w;
    
    return {
        ...prediction,
        resources_prediction_3w
    };
}