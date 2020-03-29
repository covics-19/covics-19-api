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

export function parsedPredictions(predictons: Predictions): ParsedPredictions {
    return {
        results: predictons
            .results
            .map(prediction => parseCountryPrediction(prediction)),
        timestamp: predictons.timestap
    };
}