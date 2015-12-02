(function ($, global, undefined)
{

  Neuro.rest = function(database)
  {

    function execute( method, data, url, success, failure, offlineValue )
    {
      Neuro.debug( Neuro.Debugs.REST, this, method, url, data );

      if ( Neuro.forceOffline )
      {
        failure( offlineValue, 0 );
      }
      else
      {
        function onRestSuccess(data, textStatus, jqXHR) 
        {
          success( data );
        }

        function onRestError(jqXHR, textStatus, errorThrown) 
        {
          failure( null, jqXHR.status );
        }

        var options = 
        {
          method: method,
          data: data,
          url: url,
          success: onRestSuccess,
          failure: onRestError,
          cache: false,
          dataType: 'json'
        };

        $.ajax( options );
      }
    }
    
    return {
      all: function( success, failure )
      {
        execute( 'GET', undefined, database.api, success, failure, [] );
      },
      get: function( model, success, failure )
      {
        execute( 'GET', undefined, database.api + model.$key(), success, failure );
      },
      create: function( model, encoded, success, failure )
      {
        execute( 'POST', encoded, database.api, success, failure, {} );
      },
      update: function( model, encoded, success, failure )
      {
        execute( 'PUT', encoded, database.api + model.$key(), success, failure, {} );
      },
      remove: function( model, success, failure )
      {
        execute( 'DELETE', undefined, database.api + model.$key(), success, failure, {} );
      },
      query: function( query, success, failure )
      {
        var method = query.method || 'GET';
        var data = query.data || undefined;
        var url = query.url || query;

        execute( method, data, url, success, failure );
      }
    };

  };

})( jQuery, this );