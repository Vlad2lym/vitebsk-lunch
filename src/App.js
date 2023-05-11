import LunchList from './components/LunchList.js'

const response = '[{"id":1,"name":"Ностальгия","address":"Витебск, пр-т Московский, 86","image":"https://carte.by/source/photos/2020/03/11/c9fbfc8f431eab848379ad1b8b70b571_p.jpg","lunchTime":{"start":"12.00","end":"16.00"},"menu":["Суп фасолевый","Жаркое из свинины","Винегрет"],"price":"8.95"},{"id":2,"name":"Кофе брейк","address":"Витебск, ул. Ленина, 48","image":"https://carte.by/source/photos/2019/02/07/e1d9a67510caa5aca0de8ac2017e5c3c_p.jpg","lunchTime":{"start":"11.30","end":"16.00"},"menu":["Салат «Чайка»","Щи из свежей капусты со сметаной","Драники картофельные с мясом"],"price":"9.00"},{"id":3,"name":"Лямус","address":"Витебск, пр-т Победы, 1","image":"https://carte.by/source/photos/2015/11/30/liamus_p.jpg","lunchTime":{"start":"12.00","end":"16.00"},"menu":["Салат с овощами и ветчиной","Борщ холодный со сметаной","Куриные растрепки, Картофельное пюре с маринованным огурцом"],"price":"15.50"},{"id":4,"name":"zdoba","address":"Витебск, пр-т Московский, 20","image":"https://carte.by/source/photos/2020/08/20/32aec56d6ef84a53b8720aa3bc909cb5_p.jpg","menu":["Крем-суп на выбор","Салат «Морской» на выбор","Чай или морс"],"price":"7.80"},{"id":5,"name":"Город","address":"Витебск, ул. Смоленская, 3/1","image":"https://carte.by/source/photos/2017/03/22/gorod_p.jpg","menu":["Салат «Охотничий»","Борщ «Сибирский» с фрикадельками и сметаной","Блинчики с творогом и курагой"],"price":"8.40"},{"id":6,"name":"Pizza Smile","address":"Витебск, ул. Чкалова, 35","image":"https://carte.by/source/photos/2020/03/11/c9fbfc8f431eab848379ad1b8b70b571_p.jpg","lunchTime":{"start":"12.00","end":"15.00"},"menu":["Суп фасолевый","Жаркое из свинины","Салат «Морской»"],"price":"7.00"},{"id":7,"name":"Амстердам","address":"Витебск, пр-т Московский, 56","image":"https://carte.by/source/photos/2019/02/07/e1d9a67510caa5aca0de8ac2017e5c3c_p.jpg","lunchTime":{"start":"11.00","end":"16.00"},"menu":["Салат из птицы с яблоками","Бульон куриный с крутонами","Рыба, запеченная с помидором, рис"],"price":"6.50"},{"id":8,"name":"Кукуха","address":"Витебск, ул. Суворова, 24","image":"https://carte.by/source/photos/2020/08/20/32aec56d6ef84a53b8720aa3bc909cb5_p.jpg","lunchTime":{"start":"11.00","end":"15.00"},"menu":["Суп-пюре из тыквы","Салат Венский","Паста грибная"],"price":"14.00"}]';

export default {
    components: {
        LunchList
    },

    data() {
      return {
        data: [],
        currentItem: 0,
        widthWindow: 0,
      }
    },

    methods: {
        nextItem () {
            this.currentItem += 1; 
        },
        prevItem () {
            this.currentItem -= 1; 
        },
        updateWidthWindow() {
            this.widthWindow = window.innerWidth;
        },
    },

    created() {
        window.addEventListener('resize', this.updateWidthWindow);
        this.updateWidthWindow();
    },

    mounted() {
        new Promise((res) => {
            setTimeout(() => this.data = JSON.parse(response), 500)
        })
    },

    computed: {
        sortedData() {
          if (!this.data.length) {
            return [];
          } else {
            return this.data.slice(this.currentItem, this.currentItem + this.numberCafe);
          }
        },
        numberCafe() {
            if (this.widthWindow < 1355 && this.widthWindow > 970) {
                return 3;
            } else if (this.widthWindow < 970 && this.widthWindow > 580) {
                return 2;
            } else if (this.widthWindow < 580) {
                return 1;
            } else {
                return 4;
            }
        }
    },

    template: /*template*/`
    <div className='info-block'>
        <div className='info-block-header'>
            <div className='info-block-title'>
                <h1 className='info-title'>Бизнес-ланчи в Витебске</h1>
                <a className='info-title-a' href='https://carte.by/vitebsk/' target='_blank'>
                    <img src='https://carte.by/assets/header/header/desktop/i/logo-carte.svg?v4' width='80' alt='carte.by'/>
                </a>
            </div>
            <div className='info-block-btns'>
                <button className='info-block-btns__btn' :disabled='currentItem === 0' @click='prevItem'><</button>
                <button className='info-block-btns__btn' :disabled='currentItem >= data.length - numberCafe' @click='nextItem'>></button>
            </div>
        </div>
        <LunchList :data='sortedData'></LunchList>
    </div>
    `
}