from odoo import api, fields, models, _
from odoo.exceptions import UserError

class PosOrder(models.Model):
    _inherit = 'pos.order'

    borrowed_products = fields.Integer(string='Productos prestados', default=0, compute='_compute_borrowed_products',store=True)
    
    @api.depends('lines')
    def _compute_borrowed_products(self):
        products_qty = 0
        for order in self.lines:
            if order.product_id.due_ok == True and order.price_subtotal == 0:
                products_qty =+ order.qty
        self.borrowed_products = products_qty


    @api.onchange('payment_ids', 'lines')
    def _onchange_amount_all(self):
        for order in self:
            if not order.pricelist_id.currency_id:
                raise UserError(
                    _("You can't: create a pos order from the backend interface, or unset the pricelist, or create a pos.order in a python test with Form tool, or edit the form view in studio if no PoS order exist"))
            currency = order.pricelist_id.currency_id
            order.amount_paid = sum(payment.amount for payment in order.payment_ids)
            order.amount_return = sum(payment.amount < 0 and payment.amount or 0 for payment in order.payment_ids)
            order.amount_tax = currency.round(
                sum(self._amount_line_tax(line, order.fiscal_position_id) for line in order.lines))
            amount_untaxed = currency.round(sum(line.price_subtotal for line in order.lines))
            order.amount_total = order.amount_tax + amount_untaxed
