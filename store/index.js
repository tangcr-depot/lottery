import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		position:"",
		selectPosition: false,
		id: "",
		count: 0,
		isLottery:0,
	},
	mutations: {
		setPosition(state, select) {
			state.position = select;
			state.selectPosition = select !== null && select !== "";
		},
		setid(state, id) {
			state.id = id;
		},
		setCount(state, count) {
			state.count = count;
		},
		setLottery(state, isLottery){
			state.isLottery = isLottery
		}
	},
	actions: {
		setCount(context, count) {
			context.commit("setCount", count);
		}
	}
})