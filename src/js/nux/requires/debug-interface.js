/*
An extension can boot a method when first
imported. This boot depends upon if:
	
	And requirements have been imported
	Any requirements have been booted
	Any assets have loaded

Once these conditions are met, the _meta.main method
will be executed.
 */
;(function(){
	return NuxComponentHeader.apply(this, arguments)
})('debuginterface', {
}, function(){
	var obj = {
		nodes: undefined,
		_graph: undefined,
		createMap: function(listener) {
			var n = (listener.hasOwnProperty('name'))? listener.name: listener;

			Nux.debuginterface._map[n] = {};
			var _template = $('.templates .debs').clone();
			_template.removeClass('debs').addClass('ext')
			_template.find('.count').text('1');
			_template.find('.name').text(n);
			
			if(!Nux.debuginterface._graph) {
				Nux.debuginterface.graph.create('graph');
			};

			Nux.debuginterface._map[n]['element'] = _template.appendTo('.debs-cont');
		},
		_map: {},
		writeStack: function(listener) {
			
			var n = (listener.hasOwnProperty('name'))? listener.name: listener;
			if(!Nux.debuginterface._map.hasOwnProperty(n)) {
				Nux.debuginterface.createMap(n)
			}

			var t = Nux.debuginterface._map[n]['element'];
			var st = t.find('.content .stack');
			if(st.length == 0) {
				st = $('<div/>', {
					'class': 'stack'
				}).appendTo(t.find('.content'))
			};
	

			st.empty();
			var sets = Nux.stack._stacks[n].sets();
			for (var i = 0; i < sets.length; i++) {
				var set = sets[i];

				var row = $('<div/>', {
					'class': 'row'
				}).appendTo(st);
				
				$('<div/>', {
					'class': 'name',
					html: set.name
				}).appendTo(row);

				$('<div/>', {
					'class': 'list',
					html: set.list.toString()
				}).appendTo(row);

			};
			// debugger;
		},
		colors: {
			main: '#222'
		},
		handle:{
			__nodes: {},
			extension: function(listener) {

				

				var meta = listener.item._meta? listener.item._meta: {};

				var node = {
					name: listener.name,
					// will be a parent for this group
					group: 'Nux',
					color: Nux.debuginterface.colors.main,

				}

				// debugger;
				if(meta.required){
					node.group = listener.name
				}
				
				Nux.debuginterface.graph.node(node);

				if(meta.required) {
					for (var i = 0; i < meta.required.length; i++) {
						var r = meta.required[i];
						listener.type = 'required'

						Nux.debuginterface.graph.node({
							name: r,
							fontColor: 'rgba(155, 63, 63, 1)'
						}, false);
						Nux.debuginterface.graph.edge(listener, r);
					};
				}

				if(meta.assets) {
					for (var i = 0; i < meta.assets.length; i++) {
						var r = meta.assets[i];
						listener.type = 'assets'	
						Nux.debuginterface.graph.node({
							name: r,
							fontColor: 'green'
						}, false);
						Nux.debuginterface.graph.edge(listener, r);
					};
				}
			}
		},
		graph: {
			edges: undefined,
			nodes: undefined,

			node: function(listener, edge) {
				var name = listener.name || listener
				
				if(Nux.debuginterface.handle.__nodes.hasOwnProperty(listener.name || name)) {
					return
				}

				var obj = {
					id: name,
					label: name,
					group: listener.group || 'Nux',
					radius: 3,
					shape: 'box',
					fontColor: listener.fontColor || '#EEE',
					x: listener.x || undefined,
					y: listener.y || undefined,
					color: {
						background: '#333'
					}
				}
			
				Nux.debuginterface.handle.__nodes[listener.name || listener] = Nux.debuginterface.graph.nodes.add([obj]);
				

				if(edge !== false) {

					var rStack = Nux.stack.inSet(listener.name);
					if(rStack.length > 0) {

						for (var i = 0; i < rStack.length; i++) {
							var r = rStack[i]
							var g = r.stack || 'Nux';
							Nux.debuginterface.graph.edge({
								name: obj.id,
								label: r.set
							}, g);
						};

					} else {
						//label: a.label || undefined,
						if(obj.id != 'Nux' 
							&& (listener.name)) {
								Nux.debuginterface.graph.edge({
									name: obj.id,
									label: 'import'
								}, 'Nux');
							
						}
					}
				} 
				try {
                }
                catch (err) {
                    console.error(err);
                }
                return obj;
			},
			required: function(obj){
				obj.color = 'red'
				return obj;
			},
			assets: function(obj){
				obj.color = 'green'
				return obj
			},
			edge: function(a, b) {
				/*
				A should be a node, B should be node or listener.
				 */
				if( (a.id || a) == 'Nux') return 

				var obj = {
					id: 'edge-' + (a.id || a.name || a) + '-' + (b.id || b.name || b),
					from: b.id || b.name || b,
					to: a.id || a.name || a,
					color: '#888',
					fontColor: '#000',
					length: 40,
					// label: a.label || undefined,
					style: 'dash-line', // 'arrow-center'
					dash: {
						length: 2
					}
				}

				
				if(a.type || b.type) {
					if(Nux.debuginterface.graph.hasOwnProperty(a.type || b.type))	 {
						obj = Nux.debuginterface.graph[a.type || b.type](obj)
					}
				}
				
				Nux.debuginterface.graph.edges.add(obj);
				try {
					
                }
                catch (err) {
                    console.error(err);
                }
			},
			create: function(id){
				// create a graph
				
				var nodes = new vis.DataSet();
				var edges = new vis.DataSet();


		        
				Nux.debuginterface.graph.nodes = nodes;
				Nux.debuginterface.graph.edges = edges;

			    var container = document.getElementById(id);
			    var data= {
			        nodes: nodes,
			        edges: edges,
			    };
			    var options = {
			        width: '100%',
			        height: '100%'
			    };
			    Nux.debuginterface._graph = new vis.Graph(container, data, options);
				
				Nux.debuginterface.graph.node({ 
					name: 'Nux', 
					fontColor: 'rgba(95, 222, 253, 1)',
					x: -0,
					y: -50
				});

			    return Nux.debuginterface._graph;
			}
		}
	};

	return obj
}).chain({
	// global options
	'listener.handler': 'CHAIN', // Ensure this occurs before chain occurs
	'stack.add': 'CHAIN'
},function(){
	return {
		stack: {
			add: function(id, stack, values){
				Nux.debuginterface.writeStack(id)
				// console.log('stack', id, stack, values)
			}
		},
		listener: {
			
			handler: function(listener) {
				// get a _map 
				// -- if no map, create map
				
				if(!Nux.debuginterface._map.hasOwnProperty(listener.name)) {
					Nux.debuginterface.createMap(listener);
				} else {
					var t = Nux.debuginterface._map[listener.name]['element'];
					var c = t.find('.count');
					var i = parseInt(c.text());
					c.text(++i)
				};

				Nux.debuginterface.handle.extension(listener)
				Nux.debuginterface.writeStack(listener)
			}
		}
	}
})