odoo.define('pos_settle_due.ClientLine', function (require) {
    'use strict';

    const ClientLine = require('point_of_sale.ClientLine');
    const Registries = require('point_of_sale.Registries');


    const POSSettleDueClientLine = (ClientLine) =>
        class extends ClientLine {
            getPartnerLink() {
                return `/web#model=res.partner&id=${this.props.partner.id}`;
            }
           search_partner_ids(partner_id) {
                console.log('FUNCIONA method' + partner_id);
                const pos_order_line = this.env.pos.get('pos_order_line');
                var array_orders_line = [];
                for (var j = 0; j < pos_order_line.length; j++) {
                    console.log(pos_order_line[j].id);
                    console.log(pos_order_line[j].product_id);
                    console.log(pos_order_line[j].qty);
                    console.log(pos_order_line[j].price_unit);
                }
                console.log('FUNCIONA line' + pos_order_line)
                var array_orders = [];
                const pos_order = this.env.pos.get('pos_order');
                for(var i = 0; i < pos_order.length; i++) {
                    if(pos_order[i].partner_id[0] == partner_id){
                        array_orders.push(pos_order[i]);
                    }
               }
                return array_orders;

            };
            async settleCustomerDue(event) {
                if (this.props.selectedClient == this.props.partner) {
                    event.stopPropagation();
                }
                const totalDue = this.props.partner.total_due;
                const paymentMethods = this.env.pos.payment_methods.filter(
                    (method) => this.env.pos.config.payment_method_ids.includes(method.id) && method.type != 'pay_later'
                );
                const selectionList = paymentMethods.map((paymentMethod) => ({
                    id: paymentMethod.id,
                    label: paymentMethod.name,
                    item: paymentMethod,
                }));
                const { confirmed, payload: selectedPaymentMethod } = await this.showPopup('SelectionPopup', {
                    title: this.env._t('Select the payment method to settle the due'),
                    list: selectionList,
                });
                if (!confirmed) return;
                this.trigger('discard'); // make sure the ClientListScreen resolves and properly closed.
                const newOrder = this.env.pos.add_new_order();
                const payment = newOrder.add_paymentline(selectedPaymentMethod);
                payment.set_amount(totalDue);
                newOrder.set_client(this.props.partner);
                this.showScreen('PaymentScreen');
            }

            async CustomerProductReturn(event) {
                if (this.props.selectedClient == this.props.partner) {
                    event.stopPropagation();
                }
                const total_products_lent = this.props.partner.total_products_lent;
                const partner_id = this.props.partner.id;
                const pos_order = this.env.pos.get('pos_order');

                console.log("pos_order", pos_order);
                console.log("total_products_lent", total_products_lent);
                console.log("this.props.config_id", this.env.pos.config_id);
                const get_partner = this.search_partner_ids(partner_id);
                console.log('get_partner ',get_partner);
                const {confirmed, payload} = await this.showPopup('NumberPopup', {
                    title: 'Ingrese una cantidad',
                    startingValue: total_products_lent,
                    confirmText: 'OK',
                    cancelText: 'Cancelar',
                });
                if (confirmed) {
                    // El usuario hizo clic en "OK"
                    console.log('El usuario ingresó la cantidad' + payload);
                } else {
                    // El usuario hizo clic en "Cancelar"
                    console.log('El usuario canceló el ingreso de la cantidad');
                }

                // const totalDue = this.props.partner.total_due;
                // this.showPopup('NumberPopup', {
                //     title: 'Devolver productos',
                //     startingValue: total_products_lent,
                //     confirmText: 'Confirmar',
                //     cancelText: 'Cancelar',
                // }).then((confirmed) => {
                //     if (confirmed) {
                //     // El usuario hizo clic en "Confirmar"
                //     console.log('El usuario confirmó la acción', this.env.pos.config_id);
                //     } else {
                //     // El usuario hizo clic en "Cancelar"
                //     console.log('El usuario canceló la acción');
                // });
                this.showScreen('PaymentScreen');
            }
        };

    Registries.Component.extend(ClientLine, POSSettleDueClientLine);

    return ClientLine;
});
