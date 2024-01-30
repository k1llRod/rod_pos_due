odoo.define('rod_pos_due.OrderlineDetails', function (require) {
    "use strict";

    const OrderlineDetails = require('point_of_sale.OrderlineDetails');
    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');

    const OrderlineDetailsExtend = OrderlineDetails => class extends OrderlineDetails {
        get line() {
            const line = this.props.line;
            const formatQty = (line) => {
                const quantity = line.get_quantity();
                const unit = line.get_unit();
                const decimals = this.env.pos.dp['Product Unit of Measure'];
                const rounding = Math.max(unit.rounding, Math.pow(10, -decimals));
                const roundedQuantity = round_pr(quantity, rounding);
                return format.float(roundedQuantity, { digits: [69, decimals] });
            };
            return {
                productName: line.get_full_product_name(),
                totalPrice: line.get_price_with_tax(),
                quantity: formatQty(line),
                unit: line.get_unit().name,
                unitPrice: line.get_unit_price(),
                due_ok: line.due_ok,
            };
        }

    }
    Registries.Component.extend(OrderlineDetails, OrderlineDetailsExtend);
    return OrderlineDetails;

});