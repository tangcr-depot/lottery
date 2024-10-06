<template>
	<view class="content">
		<view>
			<u-loading-page 
			:loading="loading" 
			icon-size="100" 
			loading-text="Please Wait"
			bg-color="linear-gradient(to top,#8F1E70, #51279A)"
			loading-color="#b51c06"
			color="#f29c11"
			font-size="25"
			>
			</u-loading-page>
		</view>
		<view v-if="!loading">
			<text class="text" style="margin-top: 100rpx;color: white;">抽取论文指导老师</text>
			<tiger-draw :list="list" :scroll-text1="scrollText1" :index="index" @onClick="onClick"></tiger-draw>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
	export default {
		data() {
			return {
				title: 'Hello',
				loading:true,
				list:[],
				scrollText1:['姓名'],
				index:0,
			}
		},
		mounted() {
			if(!this.$store.state.isLottery){
				var that = this
				uni.request({ 
					url:`https://lottery.mt178.com/lottery/instructor`,
					method:'GET',
					success(res){
						if(res.data.msg==='操作成功'){
							that.list = res.data.data.map(item=>item.name)
							that.scrollText1=[...that.scrollText1,...that.list,...that.list]
							return 
						}
						wx.showToast({
							title:res.data.msg,
							icon: 'error',
							duration: 1500
						})
					}
				})
			}
			else{
				this.scrollText1[0]=this.$store.state.position
			}
			setTimeout(()=>{
				var that = this
				that.loading = !that.loading 
			},500)
		},
		methods:{
			onClick(){
				var that = this
				uni.request({
					url:`https://lottery.mt178.com/lottery/instructor/${this.$store.state.id}`,
					method:'GET',
					success(res){
						if(res.data.msg==='操作成功'&&res.data.data){
							that.index=res.data.data
							return
						}
						wx.showToast({
							title:'出错了',
							icon: 'error',
							duration: 1500
						})
					}
					
				})
			}
		}
	}
</script>

<style >
page{
	background-image: linear-gradient(to top,#8F1E70, #51279A);
	min-height: calc(100vh - var(--window-bottom) - var(--window-top));
}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.text {
		display: flex;
		justify-content: center;
		font-weight: bold;
		color: white;
		font-size: 60rpx;
		margin-bottom: 20rpx;
		opacity: 0.5;
	}
</style>
