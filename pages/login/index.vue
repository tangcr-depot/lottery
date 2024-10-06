<template>
	<view class="content">
		<image class="logo" src="/static/icon.gif"></image>
		<form class="text-area" @submit="formSubmit">
			<view style="display: flex;flex-direction: row;margin-bottom: 50rpx;margin-left: 100rpx;">
				<text class="title">{{user}}</text>
				<input name="id" placeholder="请输入学号" type="text"/>
			</view>
			<view style="display: flex;flex-direction: row;margin-left: 100rpx;">
				<text class="title">{{name}}</text>
				<input name="name" placeholder="请输入姓名" type="text"/>
			</view>
			<button style="margin-top: 150rpx;" type="primary" form-type="submit">登录</button>
			<button style="margin-top: 30rpx;" form-type="reset">重置</button>
		</form>
		<view>
			<u-action-sheet 
			:closeOnClickOverlay="false" 
			:actions="list" 
			:title="title" 
			:show="show" 
			@select='onSheet' 
			@close='()=>{show=false}'>
			</u-action-sheet>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name:"login",
		data() {
			return {
				user: '学号：',
				name: '姓名：',
				obj:[1,2,3],
				title:'选择操作',
				show:false,
				list:[
					{
						name:'抽取实习地点',
					},
					{
						name:'选择指导老师'
					}
				]
			}
		},
		onLoad() {
			this.show=false
		},
		mounted() {
			this.obj=JSON.stringify(this.obj);
			console.log(this.obj);
		},
		methods: {
			formSubmit(e) {
				var that = this;
				if(e.detail.value.id === "" || e.detail.value.name === "") {
					wx.showToast({
						title:"请输入登录信息",
						icon: 'error',
						duration: 1500
					})
					return;
				}
				// that.show=!that.show;
				//    uni.request({
				// 	// url:`https://frankfei.cn/lottery_back/login/${encodeURI(e.detail.value.id)}/${encodeURI(e.detail.value.name)}`,
				// 	url:`https://lottery.mt178.com/login/${e.detail.value.id}/${e.detail.value.name}`,
				// 	method:"GET",
				// 	success(res) {
				// 		if(res.data.msg === "登录成功！") {
				// 			console.log(res.data.data.address);
				// 			that.$store.commit('setPosition', res.data.data.address)
				// 			that.$store.commit('setid', res.data.data.id)
				// 			that.$store.commit('setCount', 0)
				//			that.show=!that.show;
				// 			return;
				// 		}
				// 		wx.showToast({
				// 			title:res.data.msg,
				// 			icon: 'error',
				// 			duration: 1500
				// 		})
				// 	}
				// })
				uni.request({
					url:`https://lottery.mt178.com/logon/${e.detail.value.id}/${e.detail.value.name}`,
					method:'GET',
					success(res){
						if(res.data.msg === "登录成功！") {
							console.log(res.data);
							that.$store.commit('setPosition', res.data.data.instructor)
							that.$store.commit('setLottery',res.data.data.isLottery)
							that.$store.commit('setid', res.data.data.id)
							that.$store.commit('setCount', 0)
							that.show=!that.show;
							return;
						}
						wx.showToast({
							title:res.data.msg,
							icon: 'error',
							duration: 1500
						})
					}
				})
			  },
			  onSheet(e){
				  var that = this
				  if(e.name==="抽取实习地点"){
					  wx.showToast({
					  	title:"该功能未开放！",
					  	icon: 'error',
					  	duration: 1500
					  })
					  return
					  // wx.navigateTo({
					  // 	url:"/pages/lottery/index"
					  // });
				  }else{
					  wx.navigateTo({
					  	url:"/pages/teacher/index"
					  });
				  }
				  that.show=!that.show
			  }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 300rpx;
		width: 700rpx;
		margin-top: 150rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		width: 80vw;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-top: 100rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
		white-space:nowrap;
	}
</style>
