import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

interface ImageLoaderProps extends FastImageProps {
  defaultImageSource?: ImageSourcePropType;
  containerStyle?: StyleProp<ImageStyle>;
}

class ImageLoader extends React.Component<ImageLoaderProps> {
  defaultImageAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);

  handleDefaultImageLoad = () => {
    Animated.timing(this.defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  handleImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {source, style, containerStyle, ...props} = this.props;
    return (
      <ImageBackground
        source={require('../Assets/thumbnail.jpeg')}
        resizeMode="cover"
        imageStyle={[styles.container, containerStyle]}
        style={[styles.container, containerStyle]}>
        <AnimatedFastImage
          {...props}
          source={source}
          style={[style, {opacity: this.imageAnimated}]}
          onLoad={this.handleImageLoad}
        />
      </ImageBackground>
    );
  }
}

export default ImageLoader;

const styles = StyleSheet.create({
  container: {},
});
