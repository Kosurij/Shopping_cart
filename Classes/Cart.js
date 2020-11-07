class Cart {
    constructor(
        items, // массив с товарами в корзине
        cartClass = 'cart',
        plusClass = 'plus',
        minusClass = 'minus',
        deleteClass = 'delete',
        currency = ''
    ) {
        this.items = items;
        this.plusClass = plusClass;
        this.minusClass = minusClass;
        this.deleteClass = deleteClass;
        this.cartClass = cartClass;
        this.currency = 'RU';
    }
    goodsPlus(art) {
        this.items[art]['count']++;
    }

    goodsMinus(art) {
        if (this.items[art]['count'] - 1 == 0) {
            this.goodsDelete(art);
        } else {
            this.items[art]['count']--;
        }
    }

    goodsDelete(art) {
        delete this.items[art];
    }

    getTotal() {
        let total = 0;
        for (let key in this.items) {
            total += this.items[key]['count'] * this.items[key]['price'];
        }
        return total;
    }

    render() {
        let table = document.createElement('table'); // создаем таблицу
        table.classList.add(this.cartClass); // добавляем таблице CSS-класс из конструктора

        for (let key in this.items) {
            // делаем строку
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = 'Товар';
            td.append(span);
            tr.append(td);

            // делаем кнопку удалить
            tr = document.createElement('tr');
            td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add(this.deleteClass);
            button.innerHTML = 'x';
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);

            // делаем картинку
            td = document.createElement('td');
            let img = document.createElement('img');
            img.src = this.items[key]['image'];
            td.append(img);
            tr.append(td);

            // делаем название
            td = document.createElement('td');
            let h4 = document.createElement('h4');
            h4.innerHTML = this.items[key]['name'];
            td.append(h4);
            tr.append(td);

            // делаем цену за одно наименование
            td = document.createElement('td');
            span = document.createElement('span');
            span.innerHTML = this.items[key]['price'] + ' ' + this.currency;
            td.append(span);
            tr.append(td);

            // делаем минус
            td = document.createElement('td');
            button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add(this.minusClass);
            button.innerHTML = '-';
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);

            // делаем количество
            td = document.createElement('td');
            span = document.createElement('span');
            span.innerHTML = this.items[key]['count'];
            td.append(span);
            tr.append(td);

            // делаем плюс
            td = document.createElement('td');
            button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add(this.plusClass);
            button.innerHTML = '+';
            button.setAttribute('data-articul', key);
            td.append(button);
            tr.append(td);

            // делаем total
            td = document.createElement('td');
            span = document.createElement('span');
            span.innerHTML = this.items[key]['count'] * this.items[key]['price'] + ' ' + this.currency;
            td.append(span);
            tr.append(td);

            // добавляем данный ряд в таблицу
            table.append(tr)
        }
        // Добавляем итого
        let total = 0;
        for (let key in this.items) {
            if (key !== undefined) {
                total++;
            }
            if (total >= 1 && total < 2) {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.setAttribute('colspan', 8);
                td.style.textAlign = 'right';
                td.innerHTML = '<span class="total">Итого: </span> ' + this.getTotal() + ' ' + this.currency;
                tr.append(td);
                table.append(tr);// to table
            }
        }
        return table;
    }


}