import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { rolGuard } from './guards/rol.guard';

const routes: Routes = [

  // ── Redirige a login por defecto ──
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
  path: 'registro',
  loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule),
  },

  // ── Públicas (no requieren auth) ──
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },

  {
  path: 'perfil-editar',
  canActivate: [authGuard],
  loadChildren: () => import('./perfil-editar/perfil-editar.module').then(m => m.PerfilEditarPageModule),
  },

  {
  path: 'favoritos',
  canActivate: [authGuard],
  loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosPageModule),
  },
  {
  path: 'notificaciones',
  canActivate: [authGuard],
  loadChildren: () => import('./notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule),
  },
  // ── Tabs y detalle de contenido (cliente + admin) ──
  {
    path: 'tabs',
    canActivate: [authGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'contenido/:id',
    canActivate: [authGuard],
    loadChildren: () => import('./contenido-detalle/contenido-detalle.module').then(m => m.ContenidoDetallePageModule),
  },

  // ====================================================================
  // ── CRUDS ADMIN (requieren authGuard + rolGuard) ──
  // Cada ruta lleva `data: { vista: '...' }` que coincide con `per_vista`
  // en la tabla `permiso` del backend.
  // ====================================================================

  // CONTENT
  {
    path: 'content-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-list/content-list.module').then(m => m.ContentListPageModule),
  },
  {
    path: 'content-detail/:content_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-detail/content-detail.module').then(m => m.ContentDetailPageModule),
  },
  {
    path: 'content-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-create/content-create.module').then(m => m.ContentCreatePageModule),
  },
  {
    path: 'content-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-edit/content-edit.module').then(m => m.ContentEditPageModule),
  },

  // CONTENT GENRE
  {
    path: 'content-genre-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-genre-list/content-genre-list.module').then(m => m.ContentGenreListPageModule),
  },
  {
    path: 'content-genre-detail/:content_id/:genre_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-genre-detail/content-genre-detail.module').then(m => m.ContentGenreDetailPageModule),
  },
  {
    path: 'content-genre-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-genre-create/content-genre-create.module').then(m => m.ContentGenreCreatePageModule),
  },
  {
    path: 'content-genre-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-genre-edit/content-genre-edit.module').then(m => m.ContentGenreEditPageModule),
  },

  // CONTENT LANGUAGE
  {
    path: 'content-language-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-language-list/content-language-list.module').then(m => m.ContentLanguageListPageModule),
  },
  {
    path: 'content-language-detail/:content_id/:language_id/:language_type',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-language-detail/content-language-detail.module').then(m => m.ContentLanguageDetailPageModule),
  },
  {
    path: 'content-language-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-language-create/content-language-create.module').then(m => m.ContentLanguageCreatePageModule),
  },
  {
    path: 'content-language-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./content-language-edit/content-language-edit.module').then(m => m.ContentLanguageEditPageModule),
  },

  // EPISODE
  {
    path: 'episode-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./episode-list/episode-list.module').then(m => m.EpisodeListPageModule),
  },
  {
    path: 'episode-detail/:id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./episode-detail/episode-detail.module').then(m => m.EpisodeDetailPageModule),
  },
  {
    path: 'episode-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./episode-create/episode-create.module').then(m => m.EpisodeCreatePageModule),
  },
  {
    path: 'episode-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./episode-edit/episode-edit.module').then(m => m.EpisodeEditPageModule),
  },

  // FAVORITE
  {
    path: 'favorite-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./favorite-list/favorite-list.module').then(m => m.FavoriteListPageModule),
  },
  {
    path: 'favorite-detail/:profile_id/:content_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./favorite-detail/favorite-detail.module').then(m => m.FavoriteDetailPageModule),
  },
  {
    path: 'favorite-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./favorite-create/favorite-create.module').then(m => m.FavoriteCreatePageModule),
  },
  {
    path: 'favorite-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./favorite-edit/favorite-edit.module').then(m => m.FavoriteEditPageModule),
  },

  // GENRE
  {
    path: 'genre-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./genre-list/genre-list.module').then(m => m.GenreListPageModule),
  },
  {
    path: 'genre-detail/:id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./genre-detail/genre-detail.module').then(m => m.GenreDetailPageModule),
  },
  {
    path: 'genre-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./genre-create/genre-create.module').then(m => m.GenreCreatePageModule),
  },
  {
    path: 'genre-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./genre-edit/genre-edit.module').then(m => m.GenreEditPageModule),
  },

  // LANGUAGE
  {
    path: 'language-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./language-list/language-list.module').then(m => m.LanguageListPageModule),
  },
  {
    path: 'language-detail/:language_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./language-detail/language-detail.module').then(m => m.LanguageDetailPageModule),
  },
  {
    path: 'language-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./language-create/language-create.module').then(m => m.LanguageCreatePageModule),
  },
  {
    path: 'language-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./language-edit/language-edit.module').then(m => m.LanguageEditPageModule),
  },

  // PROFILE
  {
    path: 'profile-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./profile-list/profile-list.module').then(m => m.ProfileListPageModule),
  },
  {
    path: 'profile-detail/:profile_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./profile-detail/profile-detail.module').then(m => m.ProfileDetailPageModule),
  },
  {
    path: 'profile-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./profile-create/profile-create.module').then(m => m.ProfileCreatePageModule),
  },
  {
    path: 'profile-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./profile-edit/profile-edit.module').then(m => m.ProfileEditPageModule),
  },

  // RATING
  {
    path: 'rating-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./rating-list/rating-list.module').then(m => m.RatingListPageModule),
  },
  {
    path: 'rating-detail/:rating_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./rating-detail/rating-detail.module').then(m => m.RatingDetailPageModule),
  },
  {
    path: 'rating-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./rating-create/rating-create.module').then(m => m.RatingCreatePageModule),
  },
  {
    path: 'rating-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./rating-edit/rating-edit.module').then(m => m.RatingEditPageModule),
  },

  // SEASON
  {
    path: 'season-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./season-list/season-list.module').then(m => m.SeasonListPageModule),
  },
  {
    path: 'season-detail/:season_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./season-detail/season-detail.module').then(m => m.SeasonDetailPageModule),
  },
  {
    path: 'season-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./season-create/season-create.module').then(m => m.SeasonCreatePageModule),
  },
  {
    path: 'season-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./season-edit/season-edit.module').then(m => m.SeasonEditPageModule),
  },

  // SUBSCRIPTION
  {
    path: 'subscription-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-list/subscription-list.module').then(m => m.SubscriptionListPageModule),
  },
  {
    path: 'subscription-detail/:subscription_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-detail/subscription-detail.module').then(m => m.SubscriptionDetailPageModule),
  },
  {
    path: 'subscription-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-create/subscription-create.module').then(m => m.SubscriptionCreatePageModule),
  },
  {
    path: 'subscription-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-edit/subscription-edit.module').then(m => m.SubscriptionEditPageModule),
  },

  // SUBSCRIPTION PLAN
  {
    path: 'subscription-plan-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-plan-list/subscription-plan-list.module').then(m => m.SubscriptionPlanListPageModule),
  },
  {
    path: 'subscription-plan-detail/:plan_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-plan-detail/subscription-plan-detail.module').then(m => m.SubscriptionPlanDetailPageModule),
  },
  {
    path: 'subscription-plan-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-plan-create/subscription-plan-create.module').then(m => m.SubscriptionPlanCreatePageModule),
  },
  {
    path: 'subscription-plan-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./subscription-plan-edit/subscription-plan-edit.module').then(m => m.SubscriptionPlanEditPageModule),
  },

  // WATCH HISTORY
  {
    path: 'watch-history-list',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./watch-history-list/watch-history-list.module').then(m => m.WatchHistoryListPageModule),
  },
  {
    path: 'watch-history-detail/:history_id',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./watch-history-detail/watch-history-detail.module').then(m => m.WatchHistoryDetailPageModule),
  },
  {
    path: 'watch-history-create',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./watch-history-create/watch-history-create.module').then(m => m.WatchHistoryCreatePageModule),
  },
  {
    path: 'watch-history-edit',
    canActivate: [authGuard, rolGuard],
    loadChildren: () => import('./watch-history-edit/watch-history-edit.module').then(m => m.WatchHistoryEditPageModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}