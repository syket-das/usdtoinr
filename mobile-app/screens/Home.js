import {
  View,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import RateBarChart from '../components/charts/RateBarChart';
import Calculator from '../components/Calculator';
import useExchangeRateStore from '../store/exchangeRateStore';
import useUserStore from '../store/userStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import RateLineChart from '../components/charts/RateLineChart';
import { WebView } from 'react-native-webview';

const Home = ({ navigation }) => {
  const { exchangeRates, getExchangeRates } = useExchangeRateStore(
    (state) => state
  );

  const { user, userErr, getUser, clearUserErr } = useUserStore(
    (state) => state
  );

  const [totalCompletedAmountAdded, setTotalCompletedAmountAdded] = useState(0);
  const [totalCompletedAmountWithdrawn, setTotalCompletedAmountWithdrawn] =
    useState(0);

  useEffect(() => {
    if (user) {
      let totalAdded = 0;
      let totalWithdrawn = 0;
      user.addMoneyRequests.forEach((req) => {
        if (req.status === 'COMPLETED') {
          totalAdded += Number(req.usdt);
        }
      });
      user.withdrawMoneyRequests.forEach((req) => {
        if (req.status === 'COMPLETED') {
          totalWithdrawn += Number(req.usdt);
        }
      });
      setTotalCompletedAmountAdded(Number(totalAdded));
      setTotalCompletedAmountWithdrawn(Number(totalWithdrawn));
    }
  }, [user]);

  useEffect(() => {
    getExchangeRates();
    getUser();
  }, []);

  return (
    <SafeAreaView className="relative  bg-white p-2">
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between mt-8">
          <View>
            <View className="flex-row items-center">
              <Text className=" text-2xl font-bold">Hello,</Text>
              <Text className=" text-2xl font-bold ml-1">
                {user?.name.split(' ')[0]}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-x-2">
            <Text className=" font-bold ">
              <MaterialCommunityIcons name="wallet" size={24} />
              <Text className=" text-3xl text-teal-600">
                {totalCompletedAmountAdded - totalCompletedAmountWithdrawn}
              </Text>
            </Text>
          </View>
        </View>

        <WebView
          style={{
            flex: 1,
            height: 1500,
            width: '100%',
            // backgroundColor: 'gray',
          }}
          source={{
            html: customHTML,
          }}
        />

        <View className="mt-8">
          <View className="mx-4 justify-between items-center flex-row gap-x-4 ">
            <TouchableOpacity
              onPress={() => navigation.navigate('AddMoney')}
              className=" items-center justify-between bg-blue-500 p-4 rounded-lg flex-1"
            >
              <MaterialIcons name="arrow-downward" size={24} color="white" />
              <Text className=" text-white">Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('WithdrawMoney')}
              className=" items-center justify-between bg-green-500  p-4 rounded-lg  flex-1"
            >
              <MaterialIcons name="arrow-upward" size={24} color="white" />
              <Text className=" text-white">Withdraw</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Money')}
              className=" items-center justify-between bg-yellow-500 p-4 rounded-lg flex-1"
            >
              <MaterialIcons name="history" size={24} color="white" />
              <Text className=" text-white">History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="my-[50px]" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const customHTML = `
     
    <html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Coin Pay X</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

    <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css">
    <link rel="stylesheet" href="https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css">
    <link rel="stylesheet" type="text/css" href="./css/hero.css">
    <style type="text/css"></style>
</head>

<body>
    <section class="container">
        <div class="column is-12" style="padding: 3rem 0;">

            <div class="tradingview-widget-container" style="width: 100%; height: 173px;">
                <iframe scrolling="no" allowtransparency="true" frameborder="0"
                    src="https://www.tradingview-widget.com/embed-widget/symbol-info/?locale=en&amp;symbol=FX_IDC%3AUSDINR#%7B%22symbol%22%3A%22FX_IDC%3AUSDINR%22%2C%22width%22%3A%22100%25%22%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Atrue%2C%22height%22%3A203%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22symbol-info%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                    title="symbol info TradingView widget" lang="en"
                    style="box-sizing: border-box; display: block; height: 173px; width: 100%;"></iframe>

                <style>
                    .tradingview-widget-copyright {
                        font-size: 13px !important;
                        line-height: 32px !important;
                        text-align: center !important;
                        vertical-align: middle !important;
                        /* @mixin sf-pro-display-font; */
                        font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                        color: #B2B5BE !important;
                    }

                    .tradingview-widget-copyright .blue-text {
                        color: #2962FF !important;
                    }

                    .tradingview-widget-copyright a {
                        text-decoration: none !important;
                        color: #B2B5BE !important;
                    }

                    .tradingview-widget-copyright a:visited {
                        color: #B2B5BE !important;
                    }

                    .tradingview-widget-copyright a:hover .blue-text {
                        color: #1E53E5 !important;
                    }

                    .tradingview-widget-copyright a:active .blue-text {
                        color: #1848CC !important;
                    }

                    .tradingview-widget-copyright a:visited .blue-text {
                        color: #2962FF !important;
                    }
                </style>
            </div>

        </div>
        <div class=" column is-12 " style="padding-left: 0;color : #707A8A;margin: 20px 0;">
            <h5 class="title" style="color : #707A8A;font-size: 16px;">Highlight Coin</h5>
        </div>
        <div class=" columns is-12 " style="margin-left: 0;">
            <div class="column">

                <div class="tradingview-widget-container" style="width: 100%; height: 220px;">
                    <iframe scrolling="no" allowtransparency="true" frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22CRYPTOCAP%3ATRX%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                        title="mini symbol-overview TradingView widget" lang="en"
                        style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                    <style>
                        .tradingview-widget-copyright {
                            font-size: 13px !important;
                            line-height: 32px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            /* @mixin sf-pro-display-font; */
                            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright .blue-text {
                            color: #2962FF !important;
                        }

                        .tradingview-widget-copyright a {
                            text-decoration: none !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:visited {
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:hover .blue-text {
                            color: #1E53E5 !important;
                        }

                        .tradingview-widget-copyright a:active .blue-text {
                            color: #1848CC !important;
                        }

                        .tradingview-widget-copyright a:visited .blue-text {
                            color: #2962FF !important;
                        }
                    </style>
                </div>

            </div>
            <div class="column">

                <div class="tradingview-widget-container" style="width: 100%; height: 220px;">
                    <iframe scrolling="no" allowtransparency="true" frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22CRYPTOCAP%3AADA%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                        title="mini symbol-overview TradingView widget" lang="en"
                        style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                    <style>
                        .tradingview-widget-copyright {
                            font-size: 13px !important;
                            line-height: 32px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            /* @mixin sf-pro-display-font; */
                            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright .blue-text {
                            color: #2962FF !important;
                        }

                        .tradingview-widget-copyright a {
                            text-decoration: none !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:visited {
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:hover .blue-text {
                            color: #1E53E5 !important;
                        }

                        .tradingview-widget-copyright a:active .blue-text {
                            color: #1848CC !important;
                        }

                        .tradingview-widget-copyright a:visited .blue-text {
                            color: #2962FF !important;
                        }
                    </style>
                </div>

            </div>
            <div class="column">

                <div class="tradingview-widget-container" style="width: 100%; height: 220px;">
                    <iframe scrolling="no" allowtransparency="true" frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22CRYPTOCAP%3ASOL%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                        title="mini symbol-overview TradingView widget" lang="en"
                        style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                    <style>
                        .tradingview-widget-copyright {
                            font-size: 13px !important;
                            line-height: 32px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            /* @mixin sf-pro-display-font; */
                            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright .blue-text {
                            color: #2962FF !important;
                        }

                        .tradingview-widget-copyright a {
                            text-decoration: none !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:visited {
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:hover .blue-text {
                            color: #1E53E5 !important;
                        }

                        .tradingview-widget-copyright a:active .blue-text {
                            color: #1848CC !important;
                        }

                        .tradingview-widget-copyright a:visited .blue-text {
                            color: #2962FF !important;
                        }
                    </style>
                </div>

            </div>
        </div>
        <div class=" column is-12 " style="padding-left: 0;color : #707A8A;margin: 20px 0;">
            <h5 class="title" style="color : #707A8A;font-size: 16px;">Top Volume Coin</h5>
        </div>
        <div class=" columns is-12 " style="margin-left: 0;">
            <div class="column">

                <div class="tradingview-widget-container" style="width: 100%; height: 220px;">
                    <iframe scrolling="no" allowtransparency="true" frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22CRYPTOCAP%3ABTC%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                        title="mini symbol-overview TradingView widget" lang="en"
                        style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                    <style>
                        .tradingview-widget-copyright {
                            font-size: 13px !important;
                            line-height: 32px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            /* @mixin sf-pro-display-font; */
                            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright .blue-text {
                            color: #2962FF !important;
                        }

                        .tradingview-widget-copyright a {
                            text-decoration: none !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:visited {
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:hover .blue-text {
                            color: #1E53E5 !important;
                        }

                        .tradingview-widget-copyright a:active .blue-text {
                            color: #1848CC !important;
                        }

                        .tradingview-widget-copyright a:visited .blue-text {
                            color: #2962FF !important;
                        }
                    </style>
                </div>

            </div>
            <div class="column">

                <div class="tradingview-widget-container" style="width: 100%; height: 220px;">
                    <iframe scrolling="no" allowtransparency="true" frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22CRYPTOCAP%3AETH%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                        title="mini symbol-overview TradingView widget" lang="en"
                        style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                    <style>
                        .tradingview-widget-copyright {
                            font-size: 13px !important;
                            line-height: 32px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            /* @mixin sf-pro-display-font; */
                            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright .blue-text {
                            color: #2962FF !important;
                        }

                        .tradingview-widget-copyright a {
                            text-decoration: none !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:visited {
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:hover .blue-text {
                            color: #1E53E5 !important;
                        }

                        .tradingview-widget-copyright a:active .blue-text {
                            color: #1848CC !important;
                        }

                        .tradingview-widget-copyright a:visited .blue-text {
                            color: #2962FF !important;
                        }
                    </style>
                </div>

            </div>
            <div class="column">

                <div class="tradingview-widget-container" style="width: 100%; height: 220px;">
                    <iframe scrolling="no" allowtransparency="true" frameborder="0"
                        src="https://www.tradingview-widget.com/embed-widget/mini-symbol-overview/?locale=en#%7B%22symbol%22%3A%22CRYPTOCAP%3AFIL%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A220%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22light%22%2C%22trendLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%201)%22%2C%22underLineColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200.3)%22%2C%22underLineBottomColor%22%3A%22rgba(41%2C%2098%2C%20255%2C%200)%22%2C%22isTransparent%22%3Afalse%2C%22autosize%22%3Afalse%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22mini-symbol-overview%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                        title="mini symbol-overview TradingView widget" lang="en"
                        style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                    <style>
                        .tradingview-widget-copyright {
                            font-size: 13px !important;
                            line-height: 32px !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            /* @mixin sf-pro-display-font; */
                            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright .blue-text {
                            color: #2962FF !important;
                        }

                        .tradingview-widget-copyright a {
                            text-decoration: none !important;
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:visited {
                            color: #B2B5BE !important;
                        }

                        .tradingview-widget-copyright a:hover .blue-text {
                            color: #1E53E5 !important;
                        }

                        .tradingview-widget-copyright a:active .blue-text {
                            color: #1848CC !important;
                        }

                        .tradingview-widget-copyright a:visited .blue-text {
                            color: #2962FF !important;
                        }
                    </style>
                </div>

            </div>
        </div>
        <div class=" column is-12 " style="padding-left: 0;color : #707A8A; margin: 20px 0;">
            <h5 class="title" style="color : #707A8A;font-size: 16px;">Market of coin</h5>
        </div>
        <div class=" columns is-12 ">

            <div class="tradingview-widget-container" style="width: 100%; height: 690px;">
                <iframe allowtransparency="true" frameborder="0"
                    src="https://www.tradingview-widget.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A690%2C%22defaultColumn%22%3A%22overview%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22colorTheme%22%3A%22light%22%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fextend.coinpayx.co%2Fdetail.html%22%2C%22market%22%3A%22crypto%22%2C%22enableScrolling%22%3Atrue%2C%22utm_source%22%3A%22extend.coinpayx.co%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22cryptomktscreener%22%2C%22page-uri%22%3A%22extend.coinpayx.co%2Fmarket%22%7D"
                    title="crypto mkt-screener TradingView widget" lang="en"
                    style="box-sizing: border-box; display: block; height: 100%; width: 100%;"></iframe>

                <style>
                    .tradingview-widget-copyright {
                        font-size: 13px !important;
                        line-height: 32px !important;
                        text-align: center !important;
                        vertical-align: middle !important;
                        /* @mixin sf-pro-display-font; */
                        font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif !important;
                        color: #B2B5BE !important;
                    }

                    .tradingview-widget-copyright .blue-text {
                        color: #2962FF !important;
                    }

                    .tradingview-widget-copyright a {
                        text-decoration: none !important;
                        color: #B2B5BE !important;
                    }

                    .tradingview-widget-copyright a:visited {
                        color: #B2B5BE !important;
                    }

                    .tradingview-widget-copyright a:hover .blue-text {
                        color: #1E53E5 !important;
                    }

                    .tradingview-widget-copyright a:active .blue-text {
                        color: #1848CC !important;
                    }

                    .tradingview-widget-copyright a:visited .blue-text {
                        color: #2962FF !important;
                    }
                </style>
            </div>

        </div>
    </section>
    <script defer=""
        src="https://static.cloudflareinsights.com/beacon.min.js/v84a3a4012de94ce1a686ba8c167c359c1696973893317"
        integrity="sha512-euoFGowhlaLqXsPWQ48qSkBSCFs3DPRyiwVu3FjR96cMPx+Fr+gpWRhIafcHwqwCqWS42RZhIudOvEI+Ckf6MA=="
        data-cf-beacon="{&quot;rayId&quot;:&quot;86ad18edec77524a&quot;,&quot;r&quot;:1,&quot;version&quot;:&quot;2024.3.0&quot;,&quot;token&quot;:&quot;83bd3e9190344e90ae3dacca44fc6f5d&quot;}"
        crossorigin="anonymous"></script>

    <textarea id="BFI_DATA" style="width: 1px; height: 1px; display: none;"></textarea>
    <title> </title>
    <div id="WidgetFloaterPanels" translate="no"
        style="display: none; text-align: left; direction: ltr; visibility: hidden;" class="LTRStyle">
        <div id="WidgetFloater" style="display: none" onmouseover="Microsoft.Translator.OnMouseOverFloater()"
            onmouseout="Microsoft.Translator.OnMouseOutFloater()">
            <div id="WidgetLogoPanel"> <span id="WidgetTranslateWithSpan"><span>TRANSLATE with </span><img
                        id="FloaterLogo"></span> <span id="WidgetCloseButton" title="Exit Translation"
                    onclick="Microsoft.Translator.FloaterOnClose()">x</span></div>
            <div id="LanguageMenuPanel">
                <div class="DDStyle_outer"><input name="LanguageMenu_svid" type="text" id="LanguageMenu_svid"
                        style="display:none;" autocomplete="on" value="en" onclick="this.select()"> <input
                        name="LanguageMenu_textid" type="text" id="LanguageMenu_textid" style="display:none;"
                        autocomplete="on" onclick="this.select()"> <span onselectstart="return false" tabindex="0"
                        class="DDStyle" id="__LanguageMenu_header"
                        onclick="return LanguageMenu &amp;&amp; !LanguageMenu.Show('__LanguageMenu_popup', event);"
                        onkeydown="return LanguageMenu &amp;&amp; !LanguageMenu.Show('__LanguageMenu_popup', event);">English</span>
                    <div style="position:relative;text-align:left;left:0;">
                        <div style="position:absolute;width:;left:0px;">
                            <div class="DDStyle" style="display:none;" id="__LanguageMenu_popup">
                                <table id="LanguageMenu" border="0">
                                    <tbody>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ar');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#ar">Arabic</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('he');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#he">Hebrew</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('pl');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#pl">Polish</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('bg');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#bg">Bulgarian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('hi');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#hi">Hindi</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('pt');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#pt">Portuguese</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ca');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#ca">Catalan</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('mww');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#mww">Hmong
                                                    Daw</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ro');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#ro">Romanian</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('zh-CHS');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#zh-CHS">Chinese Simplified</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('hu');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#hu">Hungarian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ru');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#ru">Russian</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('zh-CHT');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#zh-CHT">Chinese Traditional</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('id');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#id">Indonesian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('sk');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#sk">Slovak</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('cs');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#cs">Czech</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('it');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#it">Italian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('sl');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#sl">Slovenian</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('da');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#da">Danish</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ja');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#ja">Japanese</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('es');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#es">Spanish</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('nl');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#nl">Dutch</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('tlh');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#tlh">Klingon</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('sv');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#sv">Swedish</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('en');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#en">English</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ko');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#ko">Korean</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('th');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#th">Thai</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('et');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#et">Estonian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('lv');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#lv">Latvian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('tr');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#tr">Turkish</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('fi');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#fi">Finnish</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('lt');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#lt">Lithuanian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('uk');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#uk">Ukrainian</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('fr');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#fr">French</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ms');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#ms">Malay</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ur');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#ur">Urdu</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('de');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#de">German</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('mt');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#mt">Maltese</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('vi');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#vi">Vietnamese</a></td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('el');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#el">Greek</a>
                                            </td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('no');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#no">Norwegian</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('cy');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#cy">Welsh</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('ht');"
                                                    ondragstart="LanguageMenu.ondragstart(event);" href="#ht">Haitian
                                                    Creole</a></td>
                                            <td><a tabindex="-1" onclick="return LanguageMenu.onclick('fa');"
                                                    ondragstart="LanguageMenu.ondragstart(event);"
                                                    href="#fa">Persian</a></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table> <img alt="" style="height:7px;width:17px;border-width:0px;left:20px;">
                            </div>
                        </div>
                    </div>
                </div>
                <script
                    type="text/javascript"> var LanguageMenu; var LanguageMenu_keys = ["ar", "bg", "ca", "zh-CHS", "zh-CHT", "cs", "da", "nl", "en", "et", "fi", "fr", "de", "el", "ht", "he", "hi", "mww", "hu", "id", "it", "ja", "tlh", "ko", "lv", "lt", "ms", "mt", "no", "fa", "pl", "pt", "ro", "ru", "sk", "sl", "es", "sv", "th", "tr", "uk", "ur", "vi", "cy"]; var LanguageMenu_values = ["Arabic", "Bulgarian", "Catalan", "Chinese Simplified", "Chinese Traditional", "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", "French", "German", "Greek", "Haitian Creole", "Hebrew", "Hindi", "Hmong Daw", "Hungarian", "Indonesian", "Italian", "Japanese", "Klingon", "Korean", "Latvian", "Lithuanian", "Malay", "Maltese", "Norwegian", "Persian", "Polish", "Portuguese", "Romanian", "Russian", "Slovak", "Slovenian", "Spanish", "Swedish", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"]; var LanguageMenu_callback = function () { }; var LanguageMenu_popupid = '__LanguageMenu_popup'; </script>
            </div>
            <div id="CTFLinksPanel"> <span id="ExternalLinksPanel"><a id="HelpLink" title="Help" target="_blank"
                        href="https://go.microsoft.com/?linkid=9722454"> <img id="HelpImg"></a> <a id="EmbedLink"
                        href="javascript:Microsoft.Translator.FloaterShowEmbed()"
                        title="Get this widget for your own site"> <img id="EmbedImg"></a> <a id="ShareLink"
                        title="Share translated page with friends"
                        href="javascript:Microsoft.Translator.FloaterShowSharePanel()"> <img id="ShareImg"></a> </span>
            </div>
            <div id="FloaterProgressBar"> <span id="ProgressFill"></span> </div>
        </div>
        <div id="WidgetFloaterCollapsed" style="display: none" onmouseover="Microsoft.Translator.OnMouseOverFloater()">
            <span>TRANSLATE with </span><img id="CollapsedLogoImg"></div>
        <div id="FloaterSharePanel" style="display: none">
            <div id="ShareTextDiv"> <span id="ShareTextSpan"> COPY THE URL BELOW </span> </div>
            <div id="ShareTextboxDiv"> <input name="ShareTextbox" type="text" id="ShareTextbox" readonly="readonly"
                    onclick="this.select()">
                <!--a id="TwitterLink" title="Share on Twitter"> <img id="TwitterImg" /></a> <a-- id="FacebookLink" title="Share on Facebook"> <img id="FacebookImg" /></a-->
                <a id="EmailLink" title="Email this translation"> <img id="EmailImg"></a> </div>
            <div id="ShareFooter"> <span id="ShareHelpSpan"><a id="ShareHelpLink"> <img id="ShareHelpImg"></a></span>
                <span id="ShareBackSpan"><a id="ShareBack"
                        href="javascript:Microsoft.Translator.FloaterOnShareBackClick()" title="Back To Translation">
                        Back</a></span> </div> <input name="EmailSubject" type="hidden" id="EmailSubject"
                value="Check out this page in {0} translated from {1}"> <input name="EmailBody" type="hidden"
                id="EmailBody"
                value="Translated: {0}%0d%0aOriginal: {1}%0d%0a%0d%0aAutomatic translation powered by Microsoft® Translator%0d%0ahttp://www.bing.com/translator?ref=MSTWidget">
            <input type="hidden" id="ShareHelpText"
                value="This link allows visitors to launch this page and automatically translate it to {0}.">
        </div>
        <div id="FloaterEmbed" style="display: none">
            <div id="EmbedTextDiv"> <span id="EmbedTextSpan">EMBED THE SNIPPET BELOW IN YOUR SITE</span> <a
                    id="EmbedHelpLink" title="Copy this code and place it into your HTML."> <img id="EmbedHelpImg"></a>
            </div>
            <div id="EmbedTextboxDiv"> <input name="EmbedSnippetTextBox" type="text" id="EmbedSnippetTextBox"
                    readonly="readonly"
                    value="<div id='MicrosoftTranslatorWidget' class='Dark' style='color:white;background-color:#555555'></div><script type='text/javascript'>setTimeout(function(){var s=document.createElement('script');s.type='text/javascript';s.charset='UTF-8';s.src=((location &amp;&amp; location.href &amp;&amp; location.href.indexOf('https') == 0)?'https://ssl.microsofttranslator.com':'http://www.microsofttranslator.com')+'/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&amp;ctf=true&amp;ui=true&amp;settings=manual&amp;from=en';var p=document.getElementsByTagName('head')[0]||document.documentElement;p.insertBefore(s,p.firstChild); },0);</script>"
                    onclick="this.select()"> </div>
            <div id="EmbedNoticeDiv"><span id="EmbedNoticeSpan">Enable collaborative features and customize widget: <a
                        href="http://www.bing.com/widget/translator" target="_blank">Bing Webmaster Portal</a></span>
            </div>
            <div id="EmbedFooterDiv"><span id="EmbedBackSpan"><a
                        href="javascript:Microsoft.Translator.FloaterOnEmbedBackClick()"
                        title="Back To Translation">Back</a></span></div>
        </div>
        <script
            type="text/javascript"> var intervalId = setInterval(function () { if (MtPopUpList) { LanguageMenu = new MtPopUpList(); var langMenu = document.getElementById(LanguageMenu_popupid); var origLangDiv = document.createElement("div"); origLangDiv.id = "OriginalLanguageDiv"; origLangDiv.innerHTML = "<span id='OriginalTextSpan'>ORIGINAL: </span><span id='OriginalLanguageSpan'></span>"; langMenu.appendChild(origLangDiv); LanguageMenu.Init('LanguageMenu', LanguageMenu_keys, LanguageMenu_values, LanguageMenu_callback, LanguageMenu_popupid); window["LanguageMenu"] = LanguageMenu; clearInterval(intervalId); } }, 1); </script>
    </div>
</body>

</html>
  
  `;
