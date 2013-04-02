var AttackSetupView = Backbone.View.extend({
	model: AttackSetup,
	initialize: function () {
		this.listenTo(this.model, "change", this.render)
		var html = "";
		html += 'Select Burster: <select id="bursterlevel" class="bursterSelector" name="burster">';
		for (var i = 1; i <= 8; i++) {
			html += '<option value="' + i + '">Burster Level ' + i + '</option>';
		}
		html += '</select><br />';

        html += 'Select Formula: <select id="damageformula" class="formulaSelector" name="formula">';
        _.each(DAMAGE_FUNCTIONS,function(f,code){
            html += '<option value="' + code + '">' + f.title + '</option>';
        });
        html += '</select> ';
        html += '<span id="dmggraph">-</span><br />';

		this.$el.html(html);
        $('#damageformula',this.el).val(this.model.get("formula"));
        this.updateSparkline();
		//this.render();
	},
	events: {
		"change .bursterSelector": "attacklevel",
        "change .formulaSelector": "attackformula"
	},
	attacklevel: function (e) {
		var level = $(e.currentTarget).val();
		this.model.set("level", level);
		$('#bursterlevel').val(level);
		crosshair.attr("r", mInPx(burster_range[level - 1]));
        this.updateSparkline();
	},
    attackformula: function (e) {
        var formula = $(e.currentTarget).val();
        this.model.set("formula", formula);
        $('#damageformula').val(formula);
        this.updateSparkline();
    },
    updateSparkline: function () {
        var graphdata = [];
        var code = this.model.get("formula");
        var lvl = this.model.get("level");
        var rng = burster_range[lvl-1];
        var dmg = burster_damage[lvl-1];
        var f = DAMAGE_FUNCTIONS[code].func;
        for (var x=0; x<rng; x++) {
            //(distanceM, maxRange, maxDamage, level)
            graphdata.push([x,f(x,rng, dmg, lvl)]);
        }
        $('#dmggraph').sparkline(graphdata,{width: 150});

    },
	render: function () {
	}
});
