(function () {
    'use strict';

    angular.module('app').constant('Constants', {
        LookupValues: {
            ContactType: 0,
            Category: 1,
            ConfigurationItem: 2,
            TicketStatus: 3,
            Priority: 4
        },
        Category: {
            New: 0,
            Open: 1,
            PendingRFI: 2,
            PendingOnHold: 3,
            Resolved: 4,
            Cancelled: 5,
            Closed: 6
        }
    }); 
})();
