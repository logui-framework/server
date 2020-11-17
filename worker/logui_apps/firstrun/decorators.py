from django.shortcuts import redirect
from django.db import connection


def firstrun_check(function):
    """
    Checks to ensure that the first run has been completed.
    If not, the user is redirected to the first run landing view.
    """
    def wrap(request, *args, **kwargs):
        if not request.session.get('firstrun_complete'):
            database_tables = connection.introspection.table_names()

            if len(database_tables) == 0:
                return redirect('firstrun:landing')
            
            request.session['firstrun_complete'] = True
        
        return function(request, *args, **kwargs)

    return wrap

def firstrun_prevention_check(function):
    """
    Checks to see if the first run has already been completed.
    If so, it redirects the user to the landing page.
    """
    def wrap(request, *args, **kwargs):
        if request.session.get('firstrun_complete'):
            return redirect('control:landing')

        return function(request, *args, **kwargs)

    return wrap
