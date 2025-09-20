declare module 'image-compressor' {
  export class ImageCompressor {
    constructor();
    /** Run image compression */
    run(
      /**
       * Source of the image to compress/resize. Enabled `dataURL` or image src url.
       * **Be careful with CORS restrictions!**
       */
      imageSrc: string,
      /** Object with the compression settings. */
      compressorSettings: ImageCompressorSettings,
      /** Callback function with the compressed image data URL. */
      cb: (compressedSrc: string) => void,
    ): Promise<void>;
  }

  export interface ImageCompressorSettings {
    /**
     * Values `'strict'`, `'stretch'`.
     *
     * Strict mode disables dimensional distortions, stretch mode stretches
     * or squeezes original image to fit result sizes.
     */
    mode: 'strict' | 'stretch',
    /**
     * Width in pixels of the result (compressed or stretched) image.
     * @default 100
     */
    toWidth?: number | undefined,
    /**
     * Height in pixels of the result (compressed or stretched) image.
     * @default 100
     */
    toHeight?: number | undefined,
    /**
     * Mime type of the result (compressed or stretched) image,
     * allowed values are `image/png` and `image/jpeg`.
     * @default 'image/png'
     */
    mimeType?: string | undefined,
    /**
     * Quality of the result (compressed or stretched) image,
     * allowed values are in range of 0-1 with step 0.1. So 0.5 or 0.8 are correct values,
     * but 0.35 or 2 are incorrect values.
     * @default 1
     */
    quality?: number | undefined,
    /**
     * If you need to apply grayscale filter to pixels of the compressed image,
     * just set this parameter to `true`
     * @default false
     */
    grayScale?: boolean | undefined,
    /**
     * If you need to apply sepia filter to pixels of the compressed image,
     * just set this parameter to `true`.
     * @default false
     */
    sepia?: boolean | undefined,
    /**
     * Pixel intensity edge to set black and white.
     * Pixels that has intensity larger then number specified in this setting
     * will be converted to white color, if smaller - pixel become black.
     * @default false
     */
    threshold?: number | false | undefined,
    /** Applies vertical reverse to the result image. */
    vReverse?: boolean | undefined,
    /** Applies horizontal reverse to the result image. */
    hReverse?: boolean | undefined,
    /**
     * Compression speed. Allowed values `'low'`, `'high'`.
     * In the case of the `'low'` value quality lossless algorithm is being applied (slower, many steps of compression),
     * `'high'` value compresses an image just in one step (faster, but with the large delta between original
     * and compressed sizes result image has poor quality).
     * @default 'low'
     */
    speed?: 'low' | 'high' | undefined,
  }
}