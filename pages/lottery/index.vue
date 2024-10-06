<template>
	<view class="lottery">
		<image src="../../static/img.png" style="z-index: -10;position: fixed;height: 100vh;width: 100vw;"></image>
		<text class="text" style="margin-bottom: 100rpx;">实习地点抽取</text>
		<LuckyWheel
			  ref="myLucky"
			  width="700rpx"
			  height="700rpx"
			  :blocks="blocks"
			  :prizes="prizes"
			  :buttons="buttons"
			  :defaultStyle="defaultStyle"
			  @start="startCallBack"
			  @end="endCallBack"
			/>
			<text v-if="selectPosition" class="text" style="margin-top: 50rpx;margin-left: 40rpx;">分配的实习地点：</text>
			<text v-if="selectPosition" class="text" style="color: white;opacity: 1;">{{position}}</text>
	</view>
</template>

<script>
	import LuckyWheel from '@/components/@lucky-canvas/uni/lucky-wheel.vue'
	import {mapState} from 'vuex';
	import { ref } from 'vue'
	  export default {
	    components: { LuckyWheel },
	    data () {
	      return {
	        blocks: [{ padding: '13px', background: '#617df2' }],
	        prizes: [
	          { fonts: [{ text: '常德市第五中学', top: '40%' }], background: '#e9e8fe' },
	          { fonts: [{ text: '常德外国语学校', top: '40%' }], background: '#b8c5f2' },
	          { fonts: [{ text: '文理学院附属中学十三中学', top: '40%' }], background: '#e9e8fe' },
	          { fonts: [{ text: '常德市一中育才中学', top: '40%' }], background: '#b8c5f2' },
	          { fonts: [{ text: '常德市芷兰实验学校', top: '40%' }], background: '#e9e8fe' },
	          // { fonts: [{ text: '白马湖中学', top: '10%' }], background: '#b8c5f2' },
	        ],
	        buttons: [
	          { radius: '50px', background: '#617df2' },
	          { radius: '45px', background: '#afc8ff' },
	          {
	            radius: '40px', background: '#869cfa',
	            pointer: true,
	            fonts: [{ text: '开始\n抽取', top: '-20px' }]
	          },
	        ],
	      }
	    },
	    methods: {
	      // 点击抽奖按钮触发回调
	      startCallBack () {
			if(this.$store.state.position !== null && this.$store.state.position !== "") {
				wx.showToast({
					title:"实习地点已分配",
					icon: 'error',
					duration: 1500
				});
				return;
			}
			//限制用户只能点击一次抽取
			if(this.$store.state.count) {
				return;
			}
			this.$store.commit('setCount', 1);
	        // 先开始旋转
	        this.$refs.myLucky.play()
	        setTimeout(() => {
			  var that = this;
			  var schools = ["常德市第五中学", "常德外国语学校", "文理学院附属中学十三中学", "常德市一中育才中学", "常德市芷兰实验学校"];
	          wx.request({
				  // url:`https://frankfei.cn/lottery_back/lottery/address/${that.$store.state.id}`,
				  url:`https://lottery.mt178.com/lottery/address/${that.$store.state.id}`,
				  method:'GET',
				  success(res) {
					  if(res.data.data.address === 0) {
						  wx.showToast({
						  	title:"实习地点已分完",
						  	icon: 'error',
						  	duration: 1500
						  });
						  that.$store.commit('setPosition', "实习地点已分完");
						  that.$refs.myLucky.stop(-1);
						  return;
					  }
					  //转盘停止
					  that.$refs.myLucky.stop(res.data.data.address-1);
					  setTimeout(() => {
						  that.$store.commit('setPosition', schools[res.data.data.address-1]);
					  },3000)
				  }
			  })
	        }, 3000)
	      },
	      // 抽奖结束触发回调
	      endCallBack (prize) {
	        // 奖品详情
	        console.log(prize)
	      }
	    },
		computed: {
			...mapState(['position', 'selectPosition'])
		}
	  }
</script>

<style>
	.lottery {
		background-repeat: no-repeat;
		background-size: 100%;
		height: 100vh;
	}
	.text {
		display: flex;
		justify-content: center;
		font-weight: bold;
		color: black;
		font-size: 60rpx;
		margin-bottom: 20rpx;
		opacity: 0.5;
	}
</style>