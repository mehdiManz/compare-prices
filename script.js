const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

// convert pounds to kg
function poundsToKg(pounds) {
  return pounds / 2.2046;
}

// show/hide weight input based on measure selection
const good1MeasureSelect = document.querySelector('#good1-measure');
good1MeasureSelect.addEventListener('change', () => {
  const good1WeightDiv = document.querySelector('#good1-weight-div');
  if (good1MeasureSelect.value === 'weight' || good1MeasureSelect.value === 'pounds') {
    good1WeightDiv.style.display = 'block';
  } else {
    good1WeightDiv.style.display = 'none';
  }
});

const good2MeasureSelect = document.querySelector('#good2-measure');
good2MeasureSelect.addEventListener('change', () => {
  const good2WeightDiv = document.querySelector('#good2-weight-div');
  if (good2MeasureSelect.value === 'weight' || good2MeasureSelect.value === 'pounds') {
    good2WeightDiv.style.display = 'block';
  } else {
    good2WeightDiv.style.display = 'none';
  }
});

// handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // get values from form
  const good1Name = document.querySelector('#good1-name').value;
  const good1Price = parseFloat(document.querySelector('#good1-price').value);
  const good1Measure = document.querySelector('#good1-measure').value;
  let good1Weight = null;
  if (good1Measure === 'weight') {
    good1Weight = parseFloat(document.querySelector('#good1-weight').value);
  } else if (good1Measure === 'pounds') {
    good1Weight = poundsToKg(parseFloat(document.querySelector('#good1-weight').value));
  }

  const good2Name = document.querySelector('#good2-name').value;
  const good2Price = parseFloat(document.querySelector('#good2-price').value);
  const good2Measure = document.querySelector('#good2-measure').value;
  let good2Weight = null;
  if (good2Measure === 'weight') {
    good2Weight = parseFloat(document.querySelector('#good2-weight').value);
  } else if (good2Measure === 'pounds') {
    good2Weight = poundsToKg(parseFloat(document.querySelector('#good2-weight').value));
  }

  // calculate price per unit
  let good1PricePerUnit, good2PricePerUnit;

  if (good1Measure === 'counts') {
    good1PricePerUnit = good1Price;
  } else {
    good1PricePerUnit = good1Price / good1Weight;
  }

  if (good2Measure === 'counts') {
    good2PricePerUnit = good2Price;
  } else {
    good2PricePerUnit = good2Price / good2Weight;
  }

  // compare prices
  let message;
  if (good1PricePerUnit < good2PricePerUnit) {
    message = `${good1Name} is cheaper at $${good1PricePerUnit.toFixed(2)} per ${good1Measure}.`;
  } else if (good2PricePerUnit < good1PricePerUnit) {
    message = `${good2Name} is cheaper at $${good2PricePerUnit.toFixed(2)} per ${good2Measure}.`;
  } else {
    message = `Both ${good1Name} and ${good2Name} cost the same at $${good1PricePerUnit.toFixed(2)} per ${good1Measure}.`;
  }

  // display result
  resultDiv.textContent = message;
});
