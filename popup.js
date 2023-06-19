

async function addProductNewSmThumb_priceUpdate(url, data) {
	
	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	 };
	try {
	  const response = await fetch(url, options);
	  const responseData = await response.json();
		
			console.log('responseData:', responseData);
	  return responseData;
	} catch (error) {
		console.error(error);
	}
}
 
var actionMonitor = document.getElementById('action_monitor');

var actionMonitorTable = document.getElementById('action_monitor1');
// Insert a single cell that spans two columns

var copy_done = document.getElementById('copy_done');
var exist_found = document.getElementById('exist_found');
var total_done = document.getElementById('total_done');

var copy_done_v = 0;
var exist_found_v = 0;
var total_done_v = 0;

async function waitAndLog(url, index) {
		
		var copy2baseURL = document.getElementById('copy_to_base_url').value;

			const response = await fetch(url);
		//	console.log('theURL:', url);
			const html = await response.text();

			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');
			
			var elm_all = doc.querySelectorAll('.product-name a');
			var prodCards = doc.querySelectorAll('.card .card-body .product-image-area');
			
			
			var selected_items_count = prodCards.length;
			var percentP = 100 / selected_items_count;
			var sku_id = '';

			elm_all = Array.from(elm_all);
			elm_all.reverse();
			

			prodCards = Array.from(prodCards);
			prodCards.reverse();

	//		console.log('elm_all:: ggggg ', elm_all);
					
		//	actionMonitor.innerHTML = "<h4>"+ url +" <i>[START]</i></h4><hr>" + actionMonitor.innerHTML;
			actionMonitor.insertAdjacentHTML('afterbegin', "<h4>"+ url +" <i>[STARTED] </i><span style='font-size: 1.3em;'>"+ selected_items_count +"</span> Products in this page.</h4><hr>");

			var productData = [];
			for( var i = 0; i <= prodCards.length-1; i++ ){
		//	prodCards.forEach((prodCards) => {
				
				let  stock = "yes";
				if( prodCards[i].querySelector('.out-of-stock') ){
					stock = prodCards[i].querySelector('.out-of-stock').textContent.trim();
				}

				let  productSKU = prodCards[i].querySelector('.product_title').textContent.trim();
				let  price = prodCards[i].querySelector('.price').textContent.trim();

				price = price.replace(/\D/g, "");
					
				const image = prodCards[i].querySelector('.product_image').getAttribute('src');

				productSKU = productSKU.split(' ')[0];
			//	sku = sku[0];

				// Create an object with the SKU ID and image URL
				const product = { productSKU, productPrice: price, stock, thumb: image };

				// Add the product object to the array
			//	productData.push(product);
			//	console.log("productData::", product);
				const productUpdating = await addProductNewSmThumb_priceUpdate(copy2baseURL + 'wp-json/devs-api/api-add-product-sm-thumb-n-price-update', product);

				console.log("Product data sent:: ", product);
				console.log("After Updated :: ", productUpdating);
				
				if( productUpdating.status == "success" ){

					var checkbox_price_sts = 'updated';
					console.log("productUpdating.checkbox_price:", productUpdating.checkbox_price);
					if( productUpdating.checkbox_price.status != "updated" ){
						checkbox_price_sts = '-';
					}
	
					var sm_thumb_sts = 'img-updated';
					if( productUpdating.sm_thumb.status != "updated" ){
						sm_thumb_sts = '-';
					}
	
					if( productUpdating.stock.new == "OUT OF STOCK" ){
						productUpdating.stock.new = 'outofstock';
					}else if( productUpdating.stock.new == "yes"  ){
						productUpdating.stock.new = 'instock';
					}
	
					var stock_status = "updated";
					if( productUpdating.stock.status != "updated" ){
						stock_status = '-';
					}
	
	//				actionMonitor.insertAdjacentHTML('afterbegin', "<div class='cl_sl'>" + (i+1) + ".</div> <div class='cl_sku'>" + productSKU + "</div> : "+ checkoutProduct.productTitle +" <a href='"+single_prod+"'>Lnk</a><br>");
					var retSuccMsg = "";
					retSuccMsg += "<div class='div_row'><div class='cl_sl'>" + (i+1) + ".</div> ";
					retSuccMsg += "<div class='cl_sku'>" + productSKU + " " + productUpdating.product_id +" </div>  | ";
					retSuccMsg += "<div class=''>"+ checkbox_price_sts + " (" + productUpdating.checkbox_price.prev + " - " + productUpdating.checkbox_price.new + ") </div> | ";
					retSuccMsg += "<div class=''> "+ stock_status + " (" + productUpdating.stock.prev + " - " + productUpdating.stock.new + ") </div> | ";
					retSuccMsg += "<div class=''> " + sm_thumb_sts +"</div></div> ";
				}else{

	//				actionMonitor.insertAdjacentHTML('afterbegin', "<div class='cl_sl'>" + (i+1) + ".</div> <div class='cl_sku'>" + productSKU + "</div> : "+ checkoutProduct.productTitle +" <a href='"+single_prod+"'>Lnk</a><br>");
					var retSuccMsg = "";
					retSuccMsg += "<div class='div_row'><div class='cl_sl'>" + (i+1) + ".</div> ";
					retSuccMsg += "<div class='cl_sku'>" + productSKU + " </div>  | ";
					retSuccMsg += "<div class=''>Product not found!</div></div> ";
				}

				actionMonitor.insertAdjacentHTML('afterbegin', retSuccMsg);
				copy_done_v = copy_done_v+1;
				copy_done.innerText = copy_done_v;
			
				
				total_done_v = total_done_v+1;
				total_done.innerText = total_done_v;

				
				document.getElementById('parts_of_pages').style.width = (percentP * (i+1)) + "%";
			}
}
///*



const urls = [

	/*
	"https://checkbox.live/products/allcategory?page=1",
	"https://checkbox.live/products/allcategory?page=2",
	"https://checkbox.live/products/allcategory?page=3",
	"https://checkbox.live/products/allcategory?page=4",
	"https://checkbox.live/products/allcategory?page=5",
	"https://checkbox.live/products/allcategory?page=6",
	"https://checkbox.live/products/allcategory?page=7",
	"https://checkbox.live/products/allcategory?page=8",
	"https://checkbox.live/products/allcategory?page=9",
	"https://checkbox.live/products/allcategory?page=10",
	"https://checkbox.live/products/allcategory?page=11",
	"https://checkbox.live/products/allcategory?page=12",
	"https://checkbox.live/products/allcategory?page=13",
	"https://checkbox.live/products/allcategory?page=14",
	
	"https://checkbox.live/products/allcategory?page=15",
	"https://checkbox.live/products/allcategory?page=16",
	"https://checkbox.live/products/allcategory?page=17",
	"https://checkbox.live/products/allcategory?page=18",
	"https://checkbox.live/products/allcategory?page=19",
	"https://checkbox.live/products/allcategory?page=20",
	"https://checkbox.live/products/allcategory?page=21",
	"https://checkbox.live/products/allcategory?page=22",
	"https://checkbox.live/products/allcategory?page=23",
	"https://checkbox.live/products/allcategory?page=24",
	"https://checkbox.live/products/allcategory?page=25",
	"https://checkbox.live/products/allcategory?page=26",
	"https://checkbox.live/products/allcategory?page=27",
	"https://checkbox.live/products/allcategory?page=28",
	"https://checkbox.live/products/allcategory?page=29",
	"https://checkbox.live/products/allcategory?page=30",
	"https://checkbox.live/products/allcategory?page=31",
	"https://checkbox.live/products/allcategory?page=32",

	"https://checkbox.live/products/allcategory?page=33",
	"https://checkbox.live/products/allcategory?page=34",
	"https://checkbox.live/products/allcategory?page=35",
	"https://checkbox.live/products/allcategory?page=36",
	"https://checkbox.live/products/allcategory?page=37",
//	"https://checkbox.live/products/allcategory?page=38",
//	"https://checkbox.live/products/allcategory?page=39",
//	"https://checkbox.live/products/allcategory?page=40",
	
//	"https://checkbox.live/products/allcategory?page=41",
//	"https://checkbox.live/products/allcategory?page=42",
*/
	"https://checkbox.live/products/allcategory?page=43",
/*
	"https://checkbox.live/products/allcategory?page=44",
	"https://checkbox.live/products/allcategory?page=45",
	"https://checkbox.live/products/allcategory?page=46"
	*/
];
urls.reverse();

var pages_total = document.getElementById('pages_total');
var pages_total_v = 0;
var pages_done = document.getElementById('pages_done');
var pages_done_v = 0;
var pages_processing = document.getElementById('pages_processing');
var pages_processing_v = 0;
async function product_sm_thumb_collection(){
	pages_total_v = urls.length;
	pages_total.innerText = pages_total_v;
	pages_processing.innerText = pages_total_v - pages_done_v;
	try {
		for (let i = 0; i < urls.length; i++) {
			await waitAndLog(urls[i], i);
						
			var percent = await 100 / urls.length * (i+1);

			document.getElementById('total_prog_bar').style.width = percent + "%";

			pages_done_v = pages_done_v+1;
			pages_done.innerText = pages_done_v;

			pages_processing_v = pages_total_v - pages_done_v;
			pages_processing.innerText = pages_processing_v;
		}
		
		actionMonitor.insertAdjacentHTML('afterbegin',"<h2><i>[All pages all products collection has been completed, please check]</i></h2><hr>");
		document.getElementById('action-loader').style.animation = "none";
		document.getElementById('action-loader').style.border = "0";
		document.getElementById('action-loader').innerText = "[Done]";
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

const btn_prod_coll_start = document.getElementById("prod_coll_start");
btn_prod_coll_start.addEventListener("click", function() {
	// Code to be executed when the button is clicked
	product_sm_thumb_collection();
	document.getElementById('prod_coll_start').style.display = "none";
	document.getElementById('action-loader').style.display = "block";
});

//*/
