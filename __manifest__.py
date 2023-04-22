# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'Registro de ventas a credito',
    'version': '1.0',
    'category': 'Point of Sale',
    'sequence': 6,
    'summary': "Settle custumer's due in the POS UI.",
    'description': """""",
    'depends': ['point_of_sale','account','product'],
    'data': [
        'security/account_followup_security.xml',
        'security/ir.model.access.csv',
        'views/partner_view.xml',
        'views/account_followup_views.xml',
        'data/account_followup_data.xml',
        'data/cron.xml',
        'views/product_template_views.xml',
        'views/pos_order_view.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'rod_pos_due/static/src/css/pos.css',
            'rod_pos_due/static/src/js/**/*.js',
        ],
        'web.assets_qweb': [
            'rod_pos_due/static/src/xml/**/*.xml',
        ],


    }
}
