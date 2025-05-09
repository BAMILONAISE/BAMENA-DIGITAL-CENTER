@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    @if(Auth::user()->role === 'admin')
                        <h3>Tous les cours</h3>
                    @else
                        <h3>Mes cours</h3>
                    @endif
                    <button class="btn btn-primary float-right" data-toggle="modal" data-target="#createModal">
                        Ajouter un cours
                    </button>
                </div>

                <div class="card-body">
                    @if(session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    <table class="table">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Formateur</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($cours as $c)
                                <tr>
                                    <td>{{ $c->titre }}</td>
                                    <td>{{ $c->description }}</td>
                                    <td>{{ $c->user->name }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#editModal{{ $c->id }}">
                                            Modifier
                                        </button>
                                        <form action="{{ route('cours.destroy', $c->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')">
                                                Supprimer
                                            </button>
                                        </form>
                                    </td>
                                </tr>

                                <!-- Modal d'édition -->
                                <div class="modal fade" id="editModal{{ $c->id }}" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">Modifier le cours</h5>
                                                <button type="button" class="close" data-dismiss="modal">
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <form action="{{ route('cours.update', $c->id) }}" method="POST">
                                                @csrf
                                                @method('PUT')
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <label for="titre">Titre</label>
                                                        <input type="text" class="form-control" id="titre" name="titre" value="{{ $c->titre }}" required>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="description">Description</label>
                                                        <textarea class="form-control" id="description" name="description">{{ $c->description }}</textarea>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="video_url">URL de la vidéo</label>
                                                        <input type="url" class="form-control" id="video_url" name="video_url" value="{{ $c->video_url }}">
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal de création -->
<div class="modal fade" id="createModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Ajouter un cours</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <form action="{{ route('cours.store') }}" method="POST">
                @csrf
                <div class="modal-body">
                    <div class="form-group">
                        <label for="titre">Titre</label>
                        <input type="text" class="form-control" id="titre" name="titre" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" name="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="video_url">URL de la vidéo</label>
                        <input type="url" class="form-control" id="video_url" name="video_url" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
