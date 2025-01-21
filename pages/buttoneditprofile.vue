<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="profileModal"
      tabindex="-1"
      aria-labelledby="profileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modal-custom">
          <div class="modal-body text-center">
            <!-- Warning Icon -->
            <div class="icon-container">
              <img
                src="@/public/images/iconwarning.svg"
                alt="Warning Icon"
                class="icon-warning"
              />
            </div>

            <!-- Modal Message -->
            <h5 class="modal-title mt-3">Complete your profile first</h5>

            <!-- Buttons -->
            <div class="d-flex justify-content-center gap-3 mt-4">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-custom {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-warning {
  width: 48px;
  height: 48px;
}

.modal-title {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}
</style>
