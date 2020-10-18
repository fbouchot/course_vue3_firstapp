		import { createApp } from 'vue/dist/vue.esm-browser.js'
        
        const Hello = {
            template: `
                <h3> Hello from component </h3>
            `
        }
        const Num  = {
            props: {
                asdf: {
                    type: Number,
                    required: true
                }
            },
            template: `
                <div :class="getClass(asdf)"> 
                    {{ asdf }}
                </div>
            `,
            methods: {
                getClass(number) {
                    if(this.isNewEven(number)) {
                        return 'red';
                    }
                    return 'blue';
                },
                isNewEven(number) {
                    return number % 2 === 0;
                }      
            }
        }

        const NumButton = {
            props: {
                number: {
                    type: Number,
                    required: true
                }
            },
            template: `
                <button :class="getClass(number)" @click="handleClick"> 
                    {{ number }}
                </button>
            `,
            methods: {
                handleClick() {
                    this.$emit('chosen', { number: this.number });
                },
                getClass(number) {
                    if(this.isNewEven(number)) {
                        return 'red';
                    }
                    return 'blue';
                },
                isNewEven(number) {
                    return number % 2 === 0;
                }      
            }
        }

		const app = createApp({
            components: {
                Num,
                NumButton,
                Hello
            },
            template: `
            <num-button v-for="number in numbers" :number='number' @chosen="putInArray"/>
            <h3> clicked Numbers </h3>
            <num v-for="number in clickedNumbers" :asdf='number'/>
            <br>
            <br>
            <num v-for="number in numbers" :asdf='number'/>
            <br>
            <br>
            <hello />
            <input type="checkbox" v-model="checkBoxesValues" value="a" />
            <input type="checkbox" v-model="checkBoxesValues" value="b"/>
            {{ checkBoxesValues }}
            <br>
            <br>
            <input type="radio" v-model="radioValue" value="a" />
            <input type="radio" v-model="radioValue" value="b"/>
            {{ radioValue }}
            <br>
            <br>
            <input type="checkbox" v-model="booleanValue" />
            {{ booleanValue }}
            <br>
            <br>
            <input @input="exempleInput" :value="value" />            
            <div v-if="error"> {{ error }}</div>
            <br>
            <hr>
            <br>
            <button @click='increment(5)'> Increment </button>
            <p> {{ count }} </p>
            <br>
            <div v-if='isEven(count)'> Even </div>
            <div v-else> odd </div>
            <br>
            <div >        
            <div v-for='number in numbers' :title="number">            
             <num :asdf="number" />
            </div>
            </div>
            <br>
            <div v-for='number in eventList'>        
            {{ number }}        
            </div>
            <br>
            <div v-for='number in numbers'>
            <div v-if='isEven(number)'>
            {{ number }}
            </div>           
            </div>
            <br><br> 
            <p>		
            Hello {{ message }}
            <br>
            {{ person }}
            <br>
            {{ person.name }} | {{ person.age }}
            </p>
    `,
			data() {
                    return {
                    message: 'world',
                    person: {
                        name: "flo",
                        age: 29
                    },
                    count: 0,
                    numbers: [1,2,3,4,5,6,7,8,9,10],
                    clickedNumbers: [],
                    value: 'coucou',
                    booleanValue: false,
                    radioValue: 'a',
                    checkBoxesValues: ['a']                    
				 }
            },
            computed: {
                eventList() {
                    return this.numbers.filter(num => {
                        return this.isEven(num)
                    });
                },
                error() {
                    if(this.value.length < 7) {
                        return "too short";
                    }
                }
            },
            methods: {
                putInArray(yo) {
                    this.clickedNumbers.push(yo.number);
                },
                exempleInput($nativeJsEvent) {
                    this.value = $nativeJsEvent.target.value;                                       
                },
                increment(val) {
                    this.count += val;
                },
                isEven(number) {
                    return number % 2 === 0;
                }
                                      
            }
        }).mount('#app')
        
window.app = app