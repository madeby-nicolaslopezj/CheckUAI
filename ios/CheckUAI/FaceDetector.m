//
//  FaceDetector.m
//  CheckUAI
//
//  Created by Nicolás López on 14-03-16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "FaceDetector.h"

@implementation FaceDetector

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(numFaces:(NSString *)base64 response:(RCTResponseSenderBlock)callback)
{
  NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:base64]];
  UIImage *image = [UIImage imageWithData:data];
  CIImage *ciImage = [CIImage imageWithCGImage:image.CGImage];
  
  NSDictionary *detectorOptions = @{ CIDetectorAccuracy : CIDetectorAccuracyHigh };
  CIDetector *faceDetector = [CIDetector detectorOfType:CIDetectorTypeFace context:nil options:detectorOptions];
  
  NSArray *features = [faceDetector featuresInImage:ciImage
                                            options:@{CIDetectorImageOrientation:[NSNumber numberWithInt:1]}];
  
  NSNumber *numFaces = 0;
  
  for (CIFaceFeature *feature in features)
  {
    numFaces = [NSNumber numberWithFloat:([numFaces floatValue] + 1)];
  }
  
  if ([numFaces floatValue] > 0) {
    callback(@[numFaces]);
  } else {
    callback(@[[NSNull null]]);
  }
  
  
}

@end
