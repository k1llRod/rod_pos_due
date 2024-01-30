odoo.define('rod_pos_due.PaymentScreen', function (require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');

    const PaymentScreenExtend = PaymentScreen => class extends PaymentScreen {
        constructor(){
                super(...arguments);
            }
        async validateOrder(isForceValidate) {
            console.log("validateOrder");
            console.log(this.env.pos.get_order());
            console.log(this.env.pos.get_order());
            super.validateOrder(isForceValidate);
        }
    }
    Registries.Component.extend(PaymentScreen, PaymentScreenExtend);
    return PaymentScreen;

});