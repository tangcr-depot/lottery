<template>
	<view class="">
		<view class="m_draw">
		  <view style="display: flex;align-items: center;justify-content: center;margin-top: 100rpx;">
		  	<u-icon name="play-right-fill" color="rgba(255, 255, 255, 0.2)" size="50"></u-icon>
		  	<!-- 滚动区域 -->
		  	<view class="scroll_box">
		  		<view class="transform-container" :animation="animationData1">
		  		<view v-for="(item,index) of scrollText1" class="scroll_item">
		  			<view style="font-size: 200%;">{{item}}</view>
		  		</view>
		  		</view>
		  	</view>
		  	<u-icon name="play-left-fill" color="rgba(255, 255, 255, 0.2)" size="50" ></u-icon>
		  </view>
		</view>
		<view style="display: flex;align-items: center;justify-content: center;">
			<view class="start" @tap="bindClick">
				<text >开 始</text>
			</view>
		</view>
		<view style="margin-top: 200rpx;">
			<text v-if="isLottery" class="text" style="margin-top: 50rpx;margin-left: 40rpx;">分配的指导老师：</text>
			<text v-if="isLottery" class="text" style="color: white;opacity: 1;">{{position}}</text>
		</view>
	</view>
</template>
<script>
import {mapState} from 'vuex';
	export default {
		name:'tigerDraw',
		props:{
			scrollText1:{
				type: Array,
				default: ''
			},
			list:{
				type:Array,
				default:''
			},
			index:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				animationData1:null,
			}
		},
		watch:{
			index(newVal,oldVal){
				if(newVal!==oldVal&&oldVal===0&&scrollText1.length>1){
					this.roll()
				}
				else{
					wx.showToast({
						title:'出错了,请联系管理员',
						icon: 'error',
						duration: 1500
					})
				}
			}
		},
		computed: {
			...mapState(['position', 'isLottery'])
		},
		methods:{
			bindClick:function(){
				var that = this
				if(this.$store.state.isLottery) {
					wx.showToast({
						title:"指导老师已分配",
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
				if(!this.$store.state.isLottery){
					this.$emit('onClick');
				}
				
			},
			roll:function(){
				let animation = uni.createAnimation({
				  duration: 10000,
				  timingFunction: 'ease'
				})
				// 获取元素总高度
				let height =  (this.list.length + this.index) * 76
				// 向上移动
				animation.translateY(-height + 'px').step()
				// 将动画效果赋值
				this.animationData1=animation.export()	
				
				setTimeout(()=>{
					this.$store.commit('setPosition',this.list[this.index-1]);
					this.$store.commit('setLottery',1)
				},10000)  //等待时间要大于等于动画时间
			},
			// 动画重置方法
			bindReact:function(){
				let animation = uni.createAnimation({
				  duration: 0
				})
				this.animationData1=animation.translateY(0).step().export()
			},
		}
	}
</script>
<style lang="scss">
	.m_draw{
	  width: 550rpx;
	  height: 280rpx;
	  margin: auto;
	  margin-top: 30rpx;
	}
	.scroll_box{
	  width: 100%;
	  height: 76px;
	  text-align: center;
	  overflow: hidden;
	  display: flex;
	  color: white;
	  justify-content: space-around;
	  background-color: rgba(0,0,0,0);
	}
	.scroll_item{
	  height: 76px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  flex-direction: column;
	  font-size: 28rpx;
	}
	.start{
		width: 200rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f29c11;
		border-radius: 40rpx;
		margin-top: 30rpx;
		box-shadow: 0 1px 2px rgba($color: #51279A, $alpha: 1);
		border-bottom: solid 3px #8d5805;
		box-sizing: border-box;
		text{
			font-size: 20px;
			font-weight: bold;
			color: #b51c06;
			text-shadow: 1px 1px 1px #f2e811;
		}
	}
</style>
