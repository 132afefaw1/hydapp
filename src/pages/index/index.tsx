import { View, Text } from '@tarojs/components'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import './index.scss'
import * as echarts from "../../ec-canvas/ec-canvas"
import { useState } from 'react'

export default function Index() {
  const [ec,setEc] = useState({onInit:''})
  useLoad(() => {
    console.log('Page loaded.')
  })
  useDidShow(() => {
    
    setEc({onInit:initChart()})
  })
  const getPhoneNumber = (e) => {
    console.log('000000')
    // if(!isCheck) {
    //   Taro.showToast({
    //     title: '请阅读并同意用户协议',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false
    // }else{
    //   user_dis.loginPhone(e)
    // }
  }
  const initChart = (canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
    });
    canvas.setChart(chart);

    var option = {
        title: {
            text: '我的业绩', // 标题文本
            left: 'left', // 标题水平居中
            textStyle: {
                color: '#333', // 标题颜色
                fontSize: 16 // 标题字号
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '90%',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    labelLine: {
                        normal: {
                            show: true,
                            length: 10,
                            length2: 10
                        }
                    }
                },


                center: ['50%', '50%'],
                data: [
                    { value: 0, name: '直接', itemStyle: { color: "#ccc" } },
                    { value: 0, name: '间接', itemStyle: { color: "#ccc" } }
                ]
            }
        ]
    };
    chart.setOption(option);
    return chart;
}
  return (
    <View className='index'>
      <ec-canvas canvas-id="echart-pie" ec={ec} class="echart-pie"></ec-canvas>
      <AtButton type='primary' className='At_Btn' openType='getPhoneNumber' onGetPhoneNumber={getPhoneNumber}>
        登录按钮
      </AtButton>
    </View>
  )
}
