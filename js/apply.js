(function () {
  'use strict';

  var flowDoctor = document.getElementById('form-doctor');
  var flowClinic = document.getElementById('form-clinic');
  var flowInputs = document.querySelectorAll('input[name="flow"]');
  var applyContent = document.getElementById('apply-content');
  var thankYou = document.getElementById('thank-you');
  var thankYouHeading = document.getElementById('thank-you-heading');

  var formDoctor = document.getElementById('form-doctor-form');
  var formClinic = document.getElementById('form-clinic-form');

  var doctorFueInterest = document.getElementById('doctor-fue-interest');
  var doctorTheoryInterest = document.getElementById('doctor-theory-interest');
  var interestFue = document.getElementById('interest-fue');
  var interestTrichology = document.getElementById('interest-trichology');

  function showForm(flow) {
    if (flow === 'doctor') {
      flowDoctor.hidden = false;
      flowClinic.hidden = true;
    } else {
      flowDoctor.hidden = true;
      flowClinic.hidden = false;
    }
  }

  function toggleConditionalFields() {
    if (!doctorFueInterest || !interestFue) return;
    doctorFueInterest.hidden = !interestFue.checked;
    doctorFueInterest.setAttribute('aria-hidden', interestFue.checked ? 'true' : 'false');
    if (doctorTheoryInterest && interestTrichology) {
      doctorTheoryInterest.hidden = !interestTrichology.checked;
      doctorTheoryInterest.setAttribute('aria-hidden', interestTrichology.checked ? 'true' : 'false');
    }
  }

  function showThankYou(isApplication) {
    if (!applyContent || !thankYou) return;
    applyContent.hidden = true;
    thankYou.hidden = false;
    if (thankYouHeading) {
      thankYouHeading.textContent = isApplication
        ? 'Thank you for your application.'
        : 'Thank you for your enquiry.';
    }
    if (thankYouHeading) thankYouHeading.focus({ preventScroll: true });
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (flowInputs.length) {
    flowInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        showForm(this.value);
      });
    });
  }

  if (interestFue) {
    interestFue.addEventListener('change', toggleConditionalFields);
  }
  if (interestTrichology) {
    interestTrichology.addEventListener('change', toggleConditionalFields);
  }
  toggleConditionalFields();

  if (formDoctor) {
    formDoctor.addEventListener('submit', function (e) {
      e.preventDefault();
      var nextStep = document.getElementById('doctor-next-step');
      var isApplication = nextStep && nextStep.value === 'intake';
      showThankYou(isApplication);
    });
  }

  if (formClinic) {
    formClinic.addEventListener('submit', function (e) {
      e.preventDefault();
      showThankYou(false);
    });
  }
})();
