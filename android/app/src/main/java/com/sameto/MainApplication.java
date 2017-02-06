package com.sameto;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
            new ImagePickerPackage(),
            new BlurViewPackage(),
            new VectorIconsPackage(),
            new ReactNativeI18n(),
            new RNGeocoderPackage(),
            new FBSDKPackage(mCallbackManager),
            new BlurViewPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
