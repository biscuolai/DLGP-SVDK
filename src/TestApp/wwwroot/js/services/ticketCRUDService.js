(function () {
    'use strict';

    angular
        .module('app')
        .service('ticketCRUDService', function ($http, $scope) {

        //get All Tickets
        //this.getTickets = function () {
        //    return $http.get('/api/tickets');
        //};


        // get Ticket by TicketId
        //this.getTicket = function (TicketId) {
        //    var response = $http({
        //        method: 'post',
        //        url: '/api/tickets',
        //        params: {
        //            id: JSON.stringify(TicketId)
        //        }
        //    });
        //    return response;
        //}
 


        // Update Ticket 
        //this.updateTicket = function (Ticket) {
        //    var response = $http({
        //        method: 'put',
        //        url: '/api/tickets',
        //        data: JSON.stringify(Ticket),
        //        dataType: 'json'
        //    });
        //    return response;
        //}



        // Add Ticket
        //this.AddTicket = function (Ticket) {
        //    var response = $http({
        //        method: 'post',
        //        url: '/api/tickets',
        //        data: JSON.stringify(Ticket),
        //        dataType: 'json'
        //    });
        //    return response;
        //}



        //Delete Ticket
        this.DeleteTicket = function (TicketId) {
            var response = $http({
                method: 'delete',
                url: '/api/tickets',
                params: {
                    TicketId: JSON.stringify(TicketId)
                }
            });
            return response;
        }


    });

})();