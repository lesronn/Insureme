import {Pressable, View} from 'react-native';
import React from 'react';
import AppText from './AppText';

import LottieView from 'lottie-react-native';
type ErrorProps = {
  onRetry?: () => void;
  message?: any;
  subMessage?: string;
  source: any;
};
const ErrorComponent: React.FC<ErrorProps> = ({
  onRetry,
  source,
  subMessage,
  message,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: '20%',
        paddingHorizontal: 20,
      }}>
      <Pressable onPress={onRetry}>
        <View style={{alignItems: 'center'}}>
          <LottieView
            source={source}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <View style={{transform: [{translateY: -20}]}}>
            <AppText
              fontSize={25}
              color="grey"
              fontFamily="Sora-Bold"
              style={{
                textAlign: 'center',
                paddingVertical: 10,
              }}>
              {message}
            </AppText>
            <AppText
              fontSize={18}
              color="black"
              fontFamily="Sora-Medium"
              style={{
                textAlign: 'center',
                paddingBottom: 30,
                lineHeight: 30,
              }}>
              {subMessage}
            </AppText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ErrorComponent;
