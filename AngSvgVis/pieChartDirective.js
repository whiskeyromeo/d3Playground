var pieChartWidget = angular.module('pieChartWidget', []);

pieChartWidget.directive('pieChart', function() {
	return {
		scope: {
			specs: '='
		},
		templateUrl: 'pieChartTemplate.html',
		link: function(scope, element, attr) {
			var displayPieChart = function() {

				var x1 = scope.specs.radius,
					y1 = 0,
					prevEndingAngle = 0
					total = 0;

				angular.forEach(scope.specs.slices, function(slice, i) {
					total += parseInt(slice.value);
				})

				//Generate the slices based on proportion
				angular.forEach(scope.specs.slices, function(slice, i) {
					slice.x1 = x1;
					slice.y1 = y1;

					slice.endingAngle = (slice.value/total * 360) + prevEndingAngle;
					var radians = slice.endingAngle * (Math.PI/180);
					slice.x2 = (Math.cos(radians)*scope.specs.radius); 
					slice.y2 = (Math.sin(radians)*scope.specs.radius); 

					x1 = slice.x2;
					y1 = slice.y2
					prevEndingAngle = slice.endingAngle;
				});


				//Generate the Label Ticks for each slice
				angular.forEach(scope.specs.slices, function(slice, i) {
					var angle = i == 0 ? slice.endingAngle / 2 : slice.endingAngle - (slice.endingAngle - prevEndingAngle) / 2;

					var radians = angle * (Math.PI/180);
					var ticMarkX = Math.cos(radians) * scope.specs.radius;
					var ticMarkY = Math.sin(radians) * scope.specs.radius;

					//Handle Slice Animation
					var id = scope.specs.id + '_' + i;
					slice.opacitySetting = 'animation: '+ id +' 1s linear; animation-delay: '+ i/4 +'s; animation-fill-mode: forwards;';
					var animationDefinition = '@keyframes '+ id +' { from { opacity: 0.0; } to { opacity: 1.0; }}';
					document.styleSheets[0].insertRule(animationDefinition, 0);

					slice.label.x = Math.cos(radians) * (scope.specs.radius + 20);
					slice.label.y = Math.sin(radians) * (scope.specs.radius + 20);
					slice.label.alignment = getAlignment(angle);

					slice.ticMark = { 
						x: parseInt(ticMarkX),
						y: parseInt(ticMarkY),
						rotation: parseInt(angle)
					};
					
					prevEndingAngle = slice.endingAngle;
				});

			}

			function getAlignment(s) {
				if(s < 45 ) return "start";
				else if( s < 135) return "middle";
				else if( s < 225 ) return "end";
				else if( s < 315 ) return "moddle";
				else return "start";
			}

			displayPieChart();

		}
	}
});