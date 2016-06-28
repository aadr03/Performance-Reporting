
      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadSheetsApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Sheets API client library.
       */
      function loadSheetsApi() {
        var discoveryUrl =
            'https://sheets.googleapis.com/$discovery/rest?version=v4';
        gapi.client.load(discoveryUrl).then(listMajors);
      }
/**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1uzxLg12JSkJncOxviQTLgzZIyhNzaXhqxDfZwdKid7I',
          range: 'A1:D6',
        }).then(function(response) {
          var range = response.result.values;
          console.log(range[0]);
          // if (range.values.length > 0) {
          //   appendPre('Name, Major:');
          //   for (i = 0; i < range.values.length; i++) {
          //     var row = range.values[i];
          //     // Print columns A and E, which correspond to indices 0 and 4.
          //     appendPre(row[0] + ', ' + row[4]);
          //   }
          // } else {
          //   appendPre('No data found.');
          // }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }



    