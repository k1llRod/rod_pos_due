from odoo import api, fields, models, _

class LoanHistoricProduct(models.Model):
    _name = 'loan.historic.product'

    date_process = fields.Datetime('Fecha de Proceso')
    product_id = fields.Many2one('product.product', 'Producto')
    qty = fields.Integer('Cantidad')
    type_process = fields.Selection([('out', 'Prestamo'), ('in', 'Devolucion')], 'Tipo de Proceso')
    pos_order_id = fields.Many2one('pos.order', 'Orden de Venta', ondelete='cascade')


