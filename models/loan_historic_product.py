from odoo import api, fields, models, _

class LoanHistoricProduct(models.Model):
    _name = 'loan.historic.product'

    name = fields.Char('Name')
    date_process = fields.datetime('Fecha de Proceso')
    product_id = fields.Many2one('product.product', 'Producto')
    qty = fields.Integer('Cantidad')
    type_process = fields.Selection([('out', 'Prestamo'), ('in', 'Devolucion')], 'Tipo de Proceso')

    

