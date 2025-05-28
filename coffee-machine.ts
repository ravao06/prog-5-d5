class Type {
  constructor (
    public nom: string,
    public prix: number,
    public quatite: number
  ) {}

  disponibilite (): boolean {
    return this.quatite > 0
  }

  reduireQuantite (): void {
    if (this.quatite > 0) {
      this.quatite--
    } else {
      console.log('Quantité indisponible')
    }
  }

  getQuantite (): number {
    return this.quatite
  }
}

class MachineCafe {
  private solde: number = 0
  private enPanne: boolean = false

  constructor (private cafesDisponibles: Type[]) {}
  ajouterArgent (montant: number): void {
    if (this.enPanne) return this.erreur('La machine est en panne')
    if (montant <= 0) {
      return this.erreur('Montant invalide')
    }
    this.solde += montant
    this.message(
      `montant ajouté :${montant}Ariary (solde ${this.solde} Ariary)`
    )
  }

  choisirCafe (nom: string): void {
    if (this.enPanne) return this.erreur('La machine est en panne')
    const cafe = this.trouverCafe(nom)
    if (!cafe) {
      return this.erreur(`Le café "${nom}" n'est pas disponible`)
    }
    if (!cafe.disponibilite()) {
      return this.erreur(`Le café "${nom}" est épuisé`)
    }
    if (this.solde < cafe.prix) {
      return this.erreur(
        `Solde insuffisant pour le café "${nom}" (prix: ${cafe.prix} Ariary, solde: ${this.solde} Ariary)`
      )
    }
    this.livreCafe(cafe)
  }

  commandeAnnuler (): void {
    if (this.enPanne) return this.erreur('La machine est en panne')
    if (this.solde > 0) {
        this.message(`Commande annulée. Remboursement de ${this.solde} Ariary`)
        this.solde = 0
    }else {
        this.erreur('Aucun solde à rembourser')
    }
  }

  private livreCafe (type: Type): void {
    type.reduireQuantite()
    this.solde -= type.prix
    this.message(`Café ${type.nom} servi. Bon appétit! (Kafe omena!)`)
  }
  private trouverCafe (nom: string): Type | undefined {
    return this.cafesDisponibles.find(
      p => p.nom.toLowerCase() === nom.toLowerCase()
    )
  }
  private message (message: string): void {
    console.log(`${message}`)
  }

  private erreur (message: string): void {
    console.log(`${message}`)
  }
}
