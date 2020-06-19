

const googleApiKey = "AIzaSyDOUUx2-43YP2Uoqx_SJlV4j7FjZIfC6yQ";
export const googleImageIpiPath = (imageReference) => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${imageReference}&key=${googleApiKey}`;
export const googleApi = {
  preloadGoogleImage: (imageReference: string): Promise<boolean> => {
    return fetch(googleImageIpiPath(imageReference)).then((res) => res.ok);
  }
};

